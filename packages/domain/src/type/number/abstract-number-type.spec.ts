import {
  typeErrorValidationSpec,
  typeValidationSpec,
} from '../../common/test/util-test';
import { AddValidate } from '../../validator/decorator/type-validator';
import { AbstractNumberType } from '@code-core/domain';
import { expectTypeOf } from 'expect-type';
import { ValueTypeRequired } from '../abstract-type';

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
    class NumberTypeOptional extends AbstractNumberType {}

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
    @AddValidate([
      { validator: 'IsInt' },
      { validator: 'Min', value: 10 },
      { validator: 'Max', value: 20 },
    ])
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

  describe('Type required and optional', () => {
    it('should be required number type', () => {
      class A {
        constructor(public value: number) {}
      }

      expectTypeOf<A['value']>().toEqualTypeOf<number>();
    });
    it.skip('should be required number type', () => {
      class NumberTypeRequired extends AbstractNumberType {}

      expectTypeOf<NumberTypeRequired['value']>().toEqualTypeOf<number>();
      expectTypeOf<ValueTypeRequired<number>>().not.toEqualTypeOf<
        NumberTypeRequired['value']
      >();
    });

    // it('should be optional number type', () => {
    //   class NumberTypeOptional extends AbstractNumberType<ValueTypeOptional> {}
    //   const numberTypeOptional = new NumberTypeOptional(1);
    //   numberTypeOptional.value;
    //   expectTypeOf(numberTypeOptional.value).toEqualTypeOf<number | null>();
    // });
  });
});
