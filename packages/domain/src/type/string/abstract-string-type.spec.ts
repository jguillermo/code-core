import { errorTypeValidValueSpec, typeValidationSpec, typeValidValueSpec } from '../../common/test/util-test';
import { AbstractStringType } from '@code-core/domain';
import { AddValidate } from '../../validator/decorator/type-validator';
import { canByType, PrimitivesKeys, skipByType } from '../../common/test/values-test';
import { expectTypeOf } from 'expect-type';

class StringTypeRequire extends AbstractStringType {}

@AddValidate([{ validator: 'IsOptional' }])
class StringTypeOptional extends AbstractStringType<null> {
  constructor(value: string | null = null) {
    super(value);
  }
}

describe('AbstractStringType', () => {
  describe('StringTypeRequire', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(StringTypeRequire, canByType(PrimitivesKeys.STRING), 'string');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeString: 'StringTypeRequire must be a string',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(StringTypeRequire, errorData, [
        {
          constraints: ['canBeString'],
          values: skipByType(PrimitivesKeys.STRING, PrimitivesKeys.UUID, PrimitivesKeys.NUMBER, PrimitivesKeys.BOOLEAN),
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(StringTypeRequire, {
        value: [['áéíóú', 'áéíóú']],
        isNull: [['áéíóú', false]],
        toString: [['áéíóú', 'áéíóú']],
      });
    });
  });
  describe('StringTypeOptional', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(StringTypeOptional, canByType(PrimitivesKeys.STRING, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED), 'string');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeString: 'StringTypeOptional must be a string',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(StringTypeOptional, errorData, [
        {
          constraints: ['canBeString'],
          values: skipByType(PrimitivesKeys.STRING, PrimitivesKeys.NUMBER, PrimitivesKeys.BOOLEAN, PrimitivesKeys.UUID, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(StringTypeOptional, {
        value: [
          ['áéíóú', 'áéíóú'],
          [null, null],
          [undefined, null],
        ],
        isNull: [
          ['áéíóú', false],
          [null, true],
          [undefined, true],
        ],
        toString: [['áéíóú', 'áéíóú']],
      });
    });
  });
  describe('AddValidate', () => {
    @AddValidate([
      { validator: 'MinLength', value: 2 },
      { validator: 'MaxLength', value: 5 },
    ])
    class ValueObjectString extends AbstractStringType {}

    describe('Valid Values', () => {
      typeValidValueSpec(ValueObjectString, ['abc', 'áéíóú'], 'string');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeString: 'ValueObjectString must be a string',
        maxLength: 'ValueObjectString must be shorter than or equal to 5 characters',
        minLength: 'ValueObjectString must be longer than or equal to 2 characters',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(ValueObjectString, errorData, [
        {
          constraints: ['maxLength', 'minLength', 'canBeString'],
          values: skipByType(PrimitivesKeys.STRING, PrimitivesKeys.NUMBER, PrimitivesKeys.BOOLEAN, PrimitivesKeys.UUID, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
        },
        {
          constraints: ['maxLength'],
          values: ['12345678'],
        },
        {
          constraints: ['minLength'],
          values: ['1'],
        },
      ]);
    });

    describe('Compare values', () => {
      typeValidationSpec(ValueObjectString, {
        value: [
          ['abc', 'abc'],
          ['áéíóú', 'áéíóú'],
        ],
      });
    });
  });
  describe('Expect Type', () => {
    type ExpectType = string;
    it('number and null', () => {
      const instance1 = new StringTypeOptional('abc');
      const instance2 = new StringTypeOptional();
      const instance3 = new StringTypeOptional(null);

      expectTypeOf<StringTypeOptional['value']>().toMatchTypeOf<ExpectType | null>();
      expectTypeOf<ExpectType | null>().toMatchTypeOf<StringTypeOptional['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance2.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance3.value).toMatchTypeOf<ExpectType | null>();
    });

    it('number', () => {
      const instance1 = new StringTypeRequire('abc');

      expectTypeOf<StringTypeRequire['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<StringTypeRequire['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });
  });
});
