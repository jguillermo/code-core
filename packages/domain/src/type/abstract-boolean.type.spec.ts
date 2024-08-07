import { AbstractBooleanType } from './abstract-boolean-type';
import { errorTypeValidValueSpec, typeValidationSpec, typeValidValueSpec } from '../common/test/util-test';
import { canByType, excludeItems, PrimitivesKeys, skipByType } from '../common/test/values-test';
import { expectTypeOf } from 'expect-type';
import { BooleanTypeOptional, BooleanTypeRequired } from '@code-core/domain';

describe('AbstractBooleanType', () => {
  describe('BooleanTypeRequired', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(BooleanTypeRequired, canByType(PrimitivesKeys.BOOLEAN), 'boolean');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeBoolean: 'BooleanTypeRequired must be a boolean',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(BooleanTypeRequired, errorData, [
        {
          constraints: ['canBeBoolean'],
          values: excludeItems(skipByType(PrimitivesKeys.BOOLEAN), [1, 0]),
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(BooleanTypeRequired, {
        value: [
          [true, true],
          ['true', true],
          ['false', false],
          ['1', true],
          [1, true],
          ['0', false],
          [0, false],
        ],
        isNull: [[true, false]],
        toString: [[true, 'true']],
      });
    });
  });
  describe('BooleanTypeOptional', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(BooleanTypeOptional, canByType(PrimitivesKeys.BOOLEAN, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED), 'boolean');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeBoolean: 'BooleanTypeOptional must be a boolean',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(BooleanTypeOptional, errorData, [
        {
          constraints: ['canBeBoolean'],
          values: excludeItems(skipByType(PrimitivesKeys.BOOLEAN, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED), [0, 1]),
        },
      ]);
    });
    describe('compare values', () => {
      typeValidationSpec(BooleanTypeOptional, {
        value: [
          [true, true],
          [null, null],
          [undefined, null],
          [true, true],
          ['true', true],
          ['false', false],
          ['1', true],
          [1, true],
          ['0', false],
          [0, false],
        ],
        isNull: [
          [null, true],
          [undefined, true],
          [true, false],
        ],
        toString: [
          [null, ''],
          [undefined, ''],
          [true, 'true'],
        ],
      });
    });
  });

  describe('Expect Type', () => {
    type ExpectType = boolean;
    it('boolean and null', () => {
      const instance1 = new BooleanTypeOptional(true);
      const instance2 = new BooleanTypeOptional();
      const instance3 = new BooleanTypeOptional(null);

      expectTypeOf<BooleanTypeOptional['value']>().toMatchTypeOf<ExpectType | null>();
      expectTypeOf<ExpectType | null>().toMatchTypeOf<BooleanTypeOptional['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance2.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance3.value).toMatchTypeOf<ExpectType | null>();
    });

    it('boolean', () => {
      const instance1 = new BooleanTypeRequired(true);

      expectTypeOf<BooleanTypeRequired['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<BooleanTypeRequired['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });
  });
});
