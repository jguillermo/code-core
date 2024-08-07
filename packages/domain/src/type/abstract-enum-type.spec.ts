import { AbstractEnumType } from '@code-core/domain';
import { AddValidate } from '../validator/decorator/type-validator';
import { errorTypeValidValueSpec, typeValidationSpec, typeValidValueSpec } from '../common/test/util-test';
import { allTypes, canByType, PrimitivesKeys, skipByType } from '../common/test/values-test';
import { expectTypeOf } from 'expect-type';

enum StatusString {
  UP = 'up',
  DOWN = 'down',
}

@AddValidate([{ validator: 'IsEnum', value: StatusString }])
export class EnumTypeRequired extends AbstractEnumType<StatusString> {}

@AddValidate([{ validator: 'IsEnum', value: StatusString }, { validator: 'IsOptional' }])
export class EnumTypeOptional extends AbstractEnumType<StatusString, null> {}

describe('AbstractEnumType', () => {
  describe('EnumTypeRequired', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(EnumTypeRequired, [StatusString.UP, StatusString.DOWN, 'up', 'down']);
    });
    describe('Invalid Values', () => {
      const errorData = {
        isEnum: 'EnumTypeRequired must be one of the following values: up, down',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(EnumTypeRequired, errorData, [
        {
          constraints: ['isEnum'],
          values: canByType(...allTypes()),
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(EnumTypeRequired, {
        value: [
          [StatusString.UP, 'up'],
          [StatusString.DOWN, 'down'],
          ['up', 'up'],
          ['down', 'down'],
        ],
        isNull: [
          [StatusString.UP, false],
          ['up', false],
        ],
        toString: [[StatusString.UP, 'up']],
      });
    });
  });
  describe('EnumTypeOptional', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(EnumTypeOptional, [StatusString.UP, StatusString.DOWN, 'up', 'down', ...canByType(PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED)]);
    });
    describe('Invalid Values', () => {
      const errorData = {
        isEnum: 'EnumTypeOptional must be one of the following values: up, down',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(EnumTypeOptional, errorData, [
        {
          constraints: ['isEnum'],
          values: skipByType(PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
        },
      ]);
    });
    describe('compare values', () => {
      typeValidationSpec(EnumTypeOptional, {
        value: [
          [StatusString.UP, 'up'],
          [StatusString.DOWN, 'down'],
          ['up', 'up'],
          ['down', 'down'],
          [null, null],
          [undefined, null],
        ],
        isNull: [
          [StatusString.UP, false],
          ['up', false],
          [null, true],
          [undefined, true],
        ],
        toString: [
          [StatusString.UP, 'up'],
          [null, ''],
          [undefined, ''],
        ],
      });
    });
  });

  describe('Expect Type', () => {
    type ExpectType = StatusString;
    it('Enum and null', () => {
      const instance1 = new EnumTypeOptional(StatusString.UP);
      const instance2 = new EnumTypeOptional(null);

      expectTypeOf<EnumTypeOptional['value']>().toMatchTypeOf<ExpectType | null>();
      expectTypeOf<ExpectType | null>().toMatchTypeOf<EnumTypeOptional['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance2.value).toMatchTypeOf<ExpectType | null>();
    });

    it('Enum', () => {
      const instance1 = new EnumTypeRequired(StatusString.UP);

      expectTypeOf<EnumTypeRequired['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<EnumTypeRequired['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });
  });
});
