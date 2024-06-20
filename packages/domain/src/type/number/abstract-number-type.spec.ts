import { typeErrorValidationSpec, typeValidationSpec } from '../../common/test/util-test';
import { AddValidate } from '../../validator/decorator/type-validator';
import { AbstractNumberType } from '@code-core/domain';
import { expectTypeOf } from 'expect-type';

describe('Number Type', () => {
  describe('NumberTypeRequired expect value', () => {
    class NumberTypeRequired extends AbstractNumberType {}

    describe('NumberTypeRequired expect value', () => {
      typeValidationSpec(NumberTypeRequired, {
        value: [
          //valid number value
          [1, 1],
          [-1, -1],
          [1.1, 1.1],
          [-1.1, -1.1],
          [0, 0],
          //string
          ['1', 1],
          ['1.1', 1.1],
          ['-1', -1],
          ['-1.1', -1.1],
          ['0', 0],
        ],
        isNull: [
          [0, false],
          [0.1, false],
          [1, false],
          [1.1, false],
          ['0', false],
          ['1', false],
        ],
        toString: [
          //valid number value
          [1, '1'],
          [-1, '-1'],
          [1.1, '1.1'],
          [-1.1, '-1.1'],
          [0, '0'],
          //string
          ['1', '1'],
          ['1.1', '1.1'],
          ['-1', '-1'],
          ['-1.1', '-1.1'],
          ['0', '0'],
        ],
      });
    });

    describe('NumberTypeRequired expect error', () => {
      typeErrorValidationSpec(NumberTypeRequired, {
        canBeNumber: {
          constraints: {
            canBeNumber: 'NumberTypeRequired must be a number',
          },
          values: [
            null,
            undefined,
            'random',
            true,
            false,
            '',
            '   ',
            [],
            {},
            [1, 2, 3],
            new Date(),
            { value: 123 },
            () => 123,
            Symbol('123'),
            new Function('return 123'),
          ],
        },
      });
    });
  });
  describe('NumberTypeOptional expect value', () => {
    @AddValidate([{ validator: 'IsOptional' }])
    class NumberTypeOptional extends AbstractNumberType<null> {}

    typeValidationSpec(NumberTypeOptional, {
      value: [
        //valid number value
        [1, 1],
        [-1, -1],
        [1.1, 1.1],
        [-1.1, -1.1],
        [0, 0],
        null,
        [null, null],
        [undefined, null],
        //string
        ['1', 1],
        ['1.1', 1.1],
        ['-1', -1],
        ['-1.1', -1.1],
        ['0', 0],
      ],
      isNull: [
        [null, true],
        [undefined, true],
        [0, false],
        [0.1, false],
        [1, false],
        [1.1, false],
        ['0', false],
        ['1', false],
      ],
      toString: [
        [null, ''],
        [undefined, ''],
        //valid number value
        [1, '1'],
        [-1, '-1'],
        [1.1, '1.1'],
        [-1.1, '-1.1'],
        [0, '0'],
        //string
        ['1', '1'],
        ['1.1', '1.1'],
        ['-1', '-1'],
        ['-1.1', '-1.1'],
        ['0', '0'],
      ],
    });
    typeErrorValidationSpec(NumberTypeOptional, {
      canBeNumber: {
        constraints: {
          canBeNumber: 'NumberTypeOptional must be a number',
        },
        values: [
          'random',
          true,
          false,
          '',
          '   ',
          [],
          {},
          [1, 2, 3],
          new Date(),
          { value: 123 },
          () => 123,
          Symbol('123'),
          new Function('return 123'),
        ],
      },
    });
  });
  describe('AddValidate', () => {
    @AddValidate([{ validator: 'IsInt' }, { validator: 'Min', value: 10 }, { validator: 'Max', value: 20 }])
    class ValueObjectNumber extends AbstractNumberType {}

    typeValidationSpec(ValueObjectNumber, {
      value: [
        //valid number value
        [10, 10],
        [15, 15],
        [20, 20],
      ],
    });

    typeErrorValidationSpec(ValueObjectNumber, {
      notNumber: {
        constraints: {
          canBeNumber: 'ValueObjectNumber must be a number',
          isInt: 'ValueObjectNumber must be an integer number',
          max: 'ValueObjectNumber must not be greater than 20',
          min: 'ValueObjectNumber must not be less than 10',
        },
        values: [
          'random',
          '21.1.1',
          true,
          false,
          '',
          '   ',
          [],
          {},
          [1, 2, 3],
          new Date(),
          { value: 123 },
          () => 123,
          Symbol('123'),
          new Function('return 123'),
        ],
      },
      isInt: {
        constraints: {
          isInt: 'ValueObjectNumber must be an integer number',
        },
        values: ['11.1', 11.1],
      },
    });
  });

  describe('Validation number Type', () => {
    it('should correctly handle type validation for value with null and number ', () => {
      class B extends AbstractNumberType<null> {}

      expectTypeOf<B['value']>().toEqualTypeOf<number | null>();
      expectTypeOf<number | null>().toEqualTypeOf<B['value']>();

      const instance1 = new B();
      expectTypeOf(instance1.value).toEqualTypeOf<number | null>();

      const instance2 = new B(42);
      expectTypeOf(instance2.value).toEqualTypeOf<number | null>();

      const instance3 = new B(null);
      expectTypeOf(instance3.value).toEqualTypeOf<number | null>();
    });

    it('should correctly handle type validation for strict value number ', () => {
      class C extends AbstractNumberType {}

      expectTypeOf<C['value']>().toEqualTypeOf<number>();
      expectTypeOf<number>().toEqualTypeOf<C['value']>();

      const instance1 = new C();
      expectTypeOf(instance1.value).toEqualTypeOf<number>();

      const instance2 = new C(42);
      expectTypeOf(instance2.value).toEqualTypeOf<number>();
    });
  });
});
