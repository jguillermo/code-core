//import { ArrayTypeOptional, ArrayTypeRequired } from './index';
import { AddValidate } from '../validator/decorator/type-validator';
import { AbstractArrayType } from './abstract-array-type';
import { NumberTypeRequired } from './index';
import { PrimitiveType } from '../primitive/primitive-type';
import { expectTypeOf } from 'expect-type';

@AddValidate([{ validator: 'Max', value: 100 }])
class Age extends NumberTypeRequired {}

//AbstractBooleanType
// @AddValidate([{ validator: 'IsOptional' }])
// export class ArrayTypeOptional extends AbstractArrayType<null> {
//   constructor(value: boolean | null = null) {
//     super(value);
//   }
// }

@AddValidate([{ validator: 'IsNotEmpty' }, { validator: 'MinLength', value: 1 }])
export class ArrayTypeRequired extends AbstractArrayType<Age> {
  getItemClass(value: PrimitiveType<Age>): Age {
    return new Age(value);
  }
}

describe('AbstractArrayType', () => {
  describe('ArrayTypeRequired', () => {
    describe('Valid Values', () => {
      [[1], [1, 2]].forEach((value) => {
        it(`Valid type: AbstractArrayType`, async () => {
          const type = new ArrayTypeRequired(value);
          expect(type.isValid()).toEqual(true);
          expect(type.validatorMessageStr()).toEqual('');
        });
      });
    });
    describe('Invalid Values', () => {
      [
        [[], 'must be longer than or equal to 1 characters'],
        [undefined, 'must be an array, should not be empty, must be longer than or equal to 1 characters'],
        [null, 'must be an array, should not be empty, must be longer than or equal to 1 characters'],
      ].forEach((value) => {
        it(`Valid type: AbstractArrayType`, async () => {
          const type = new ArrayTypeRequired(value[0] as any);
          expect(type.isValid()).toEqual(false);
          expect(type.validatorMessageStr()).toEqual(value[1]);
        });
      });
    });
    describe('Invalid Values', () => {
      [
        [['a'], 'Validation Error: Expected a valid Number, but received "a".'],
        [[true], 'Validation Error: Expected a valid Number, but received true.'],
        [[1, 'a', true], 'Validation Error: Expected a valid Number, but received "a".'],
        [1, 'value 1 is not a Array.'],
        ['1', 'value 1 is not a Array.'],
        ['abc', 'value abc is not a Array.'],
        [true, 'value true is not a Array.'],
        [{ a: 1 }, 'value [object Object] is not a Array.'],
      ].forEach((value) => {
        it(`Valid type: AbstractArrayType`, async () => {
          expect(() => new ArrayTypeRequired(value[0] as any)).toThrowError(value[1] as string);
        });
      });
    });

    describe('Compare values', () => {
      [
        [[1], [1]],
        [['1'], [1]],
        [
          [1, 2],
          [1, 2],
        ],
        [
          ['1', '2'],
          [1, 2],
        ],
      ].forEach((value) => {
        it(`compare vales`, async () => {
          const type = new ArrayTypeRequired(value[0] as any);
          expect(type.value).toEqual(value[1]);
        });
      });
    });
  });
  // describe('ArrayTypeOptional', () => {
  //   describe('Valid Values', () => {
  //     typeValidValueSpec(validateType, ArrayTypeOptional, canByType(PrimitivesKeys.BOOLEAN, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED), 'boolean');
  //   });
  //   describe('Invalid Values', () => {
  //     const errorData = {
  //       canBeBoolean: 'ArrayTypeOptional must be a boolean',
  //       typePrimitive: 'Validation Error: Expected a valid Boolean, but received {{$1}}.',
  //     };
  //     errorTypeValidValueSpec<keyof typeof errorData>(validateType, TypePrimitiveException, ArrayTypeOptional, errorData, [
  //       {
  //         constraints: ['typePrimitive'],
  //         values: excludeItems(skipByType(PrimitivesKeys.BOOLEAN, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED), [0, 1]),
  //         valuesTxt: { typePrimitive: { '{{$1}}': universalToString } },
  //       },
  //     ]);
  //   });
  //   describe('compare values', () => {
  //     typeValidationSpec(validateType, ArrayTypeOptional, {
  //       value: [
  //         [true, true],
  //         [null, null],
  //         [undefined, null],
  //         [true, true],
  //         ['true', true],
  //         ['false', false],
  //         ['1', true],
  //         [1, true],
  //         ['0', false],
  //         [0, false],
  //       ],
  //       isNull: [
  //         [null, true],
  //         [undefined, true],
  //         [true, false],
  //       ],
  //       toString: [
  //         [null, ''],
  //         [undefined, ''],
  //         [true, 'true'],
  //       ],
  //     });
  //   });
  // });

  describe('Expect Type', () => {
    type ExpectType = number[];
    // it('boolean and null', () => {
    //   const instance1 = new ArrayTypeOptional(true);
    //   const instance2 = new ArrayTypeOptional();
    //   const instance3 = new ArrayTypeOptional(null);
    //
    //   expectTypeOf<ArrayTypeOptional['value']>().toMatchTypeOf<ExpectType | null>();
    //   expectTypeOf<ExpectType | null>().toMatchTypeOf<ArrayTypeOptional['value']>();
    //   expectTypeOf(instance1.value).toMatchTypeOf<ExpectType | null>();
    //   expectTypeOf(instance2.value).toMatchTypeOf<ExpectType | null>();
    //   expectTypeOf(instance3.value).toMatchTypeOf<ExpectType | null>();
    // });

    it('Expect Type  array required', () => {
      const instance1 = new ArrayTypeRequired([1]);
      expectTypeOf<ArrayTypeRequired['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<ArrayTypeRequired['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });
  });
});
