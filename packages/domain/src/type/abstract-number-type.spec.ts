import { errorTypeValidValueSpec, typeValidationSpec, typeValidValueSpec } from '../common/test/util-test';
import { AddValidate } from '../validator/decorator/type-validator';
import { expectTypeOf } from 'expect-type';
import { canByType, nullables, PrimitivesKeys, skipByType, skipByTypeRequired } from '../common/test/values-test';
import { universalToString } from '@code-core/common';
import { AbstractNumberType, NumberTypeOptional, NumberTypeRequired } from './index';

describe('AbstractNumberType', () => {
  describe('NumberTypeRequired', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(NumberTypeRequired, canByType(PrimitivesKeys.NUMBER), 'number');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeNumber: 'NumberTypeRequired must be a number',
        isNotEmpty: 'NumberTypeRequired should not be empty',
        typePrimitive: 'Validation Error: Expected a valid Number, but received {{$1}}.',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(NumberTypeRequired, errorData, [
        {
          constraints: ['typePrimitive'],
          values: skipByTypeRequired(PrimitivesKeys.NUMBER),
          valuesTxt: { typePrimitive: { '{{$1}}': universalToString } },
        },
        {
          constraints: ['canBeNumber', 'isNotEmpty'],
          values: nullables(),
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(NumberTypeRequired, {
        value: [[1, 1]],
        isNull: [[1, false]],
        toString: [[1, '1']],
      });
    });
  });
  describe('NumberTypeOptional', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(NumberTypeOptional, canByType(PrimitivesKeys.NUMBER, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED), 'number');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeNumber: 'NumberTypeOptional must be a number',
        typePrimitive: 'Validation Error: Expected a valid Number, but received {{$1}}.',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(NumberTypeOptional, errorData, [
        {
          constraints: ['typePrimitive'],
          values: skipByType(PrimitivesKeys.NUMBER, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
          valuesTxt: { typePrimitive: { '{{$1}}': universalToString } },
        },
      ]);
    });
    describe('compare values', () => {
      typeValidationSpec(NumberTypeOptional, {
        value: [
          [1, 1],
          [null, null],
          [undefined, null],
          ['1', 1],
        ],
        isNull: [
          [null, true],
          [undefined, true],
          [0, false],
        ],
        toString: [
          [null, ''],
          [undefined, ''],
          [1, '1'],
        ],
      });
    });
  });

  describe('AddValidate', () => {
    @AddValidate([{ validator: 'IsInt' }, { validator: 'Min', value: 10 }, { validator: 'Max', value: 20 }])
    class ValueObjectNumber extends AbstractNumberType {}

    describe('Valid Values', () => {
      typeValidValueSpec(ValueObjectNumber, [10, 15, 20], 'number');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeNumber: 'ValueObjectNumber must be a number',
        isInt: 'ValueObjectNumber must be an integer number',
        max: 'ValueObjectNumber must not be greater than 20',
        min: 'ValueObjectNumber must not be less than 10',
        typePrimitive: 'Validation Error: Expected a valid Number, but received {{$1}}.',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(ValueObjectNumber, errorData, [
        {
          constraints: ['typePrimitive'],
          values: skipByType(PrimitivesKeys.NUMBER, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
          valuesTxt: { typePrimitive: { '{{$1}}': universalToString } },
        },
        {
          constraints: ['isInt'],
          values: [10.1],
        },
        {
          constraints: ['max'],
          values: [21, 22],
        },
        {
          constraints: ['min'],
          values: [1, 2],
        },
        {
          constraints: ['min', 'isInt'],
          values: ['1.1', 2.1],
        },
        {
          constraints: ['max', 'isInt'],
          values: ['21.1', 22.1],
        },
      ]);
    });

    describe('Compare values', () => {
      typeValidationSpec(ValueObjectNumber, {
        value: [
          [10, 10],
          [15, 15],
          [20, 20],
        ],
      });
    });
  });

  describe('Expect Type', () => {
    type ExpectType = number;
    it('number and null', () => {
      const instance1 = new NumberTypeOptional(42);
      const instance2 = new NumberTypeOptional();
      const instance3 = new NumberTypeOptional(null);

      expectTypeOf<NumberTypeOptional['value']>().toMatchTypeOf<ExpectType | null>();
      expectTypeOf<ExpectType | null>().toMatchTypeOf<NumberTypeOptional['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance2.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance3.value).toMatchTypeOf<ExpectType | null>();
    });

    it('number', () => {
      const instance1 = new NumberTypeRequired(42);

      expectTypeOf<NumberTypeRequired['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<NumberTypeRequired['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });
  });
});
