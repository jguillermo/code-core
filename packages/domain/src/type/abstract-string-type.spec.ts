import { errorTypeValidValueSpec, typeValidationSpec, typeValidValueSpec } from '../common/test/util-test';

import { AddValidate } from '../validator/decorator/type-validator';
import { canByType, excludeItems, PrimitivesKeys, skipByType, skipByTypeRequired } from '../common/test/values-test';
import { expectTypeOf } from 'expect-type';
import { universalToString } from '../common/utils/string/universal-to-string';
import { AbstractStringType, StringTypeOptional, StringTypeRequired } from './index';

describe('AbstractStringType', () => {
  describe('StringTypeRequired', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(StringTypeRequired, excludeItems(canByType(PrimitivesKeys.STRING), ['']), 'string');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeString: 'StringTypeRequired must be a string',
        isNotEmpty: 'StringTypeRequired should not be empty',
        typePrimitive: 'Validation Error: Expected a valid String, but received {{$1}}.',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(StringTypeRequired, errorData, [
        {
          constraints: ['typePrimitive'],
          values: skipByTypeRequired(PrimitivesKeys.STRING, PrimitivesKeys.UUID, PrimitivesKeys.NUMBER, PrimitivesKeys.BOOLEAN),
          valuesTxt: { typePrimitive: { '{{$1}}': universalToString } },
        },
        {
          constraints: ['canBeString', 'isNotEmpty'],
          values: [...canByType(PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED)],
        },
        {
          constraints: ['isNotEmpty'],
          values: [''],
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(StringTypeRequired, {
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
        typePrimitive: 'Validation Error: Expected a valid String, but received {{$1}}.',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(StringTypeOptional, errorData, [
        {
          constraints: ['typePrimitive'],
          values: skipByType(PrimitivesKeys.STRING, PrimitivesKeys.NUMBER, PrimitivesKeys.BOOLEAN, PrimitivesKeys.UUID, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
          valuesTxt: { typePrimitive: { '{{$1}}': universalToString } },
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
        typePrimitive: 'Validation Error: Expected a valid String, but received {{$1}}.',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(ValueObjectString, errorData, [
        {
          constraints: ['typePrimitive'],
          values: skipByType(PrimitivesKeys.STRING, PrimitivesKeys.NUMBER, PrimitivesKeys.BOOLEAN, PrimitivesKeys.UUID, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
          valuesTxt: { typePrimitive: { '{{$1}}': universalToString } },
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
      const instance1 = new StringTypeRequired('abc');

      expectTypeOf<StringTypeRequired['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<StringTypeRequired['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });
  });
});
