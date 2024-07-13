import { errorTypeValidatorSpec, typeInvalidValueSpec, typeValidationSpec, typeValidValueSpec } from '../../common/test/util-test';
import { AddValidate } from '../../validator/decorator/type-validator';
import { AbstractNumberType } from '@code-core/domain';
import { expectTypeOf } from 'expect-type';
import { canByType, PrimitivesKeys, skipByType } from '../../common/test/values-test';

class NumberTypeRequired extends AbstractNumberType {}

@AddValidate([{ validator: 'IsOptional' }])
class NumberTypeOptional extends AbstractNumberType<null> {
  constructor(value: number | null = null) {
    super(value);
  }
}

describe('AbstractNumberType', () => {
  describe('NumberTypeRequired', () => {
    describe('Correct', () => {
      typeValidValueSpec(NumberTypeRequired, [...canByType(PrimitivesKeys.NUMBER)], 'number');
    });

    describe('Error', () => {
      typeInvalidValueSpec(NumberTypeRequired, [...skipByType(PrimitivesKeys.NUMBER)], { canBeNumber: 'NumberTypeRequired must be a number' });
    });

    describe('valid properties', () => {
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
  });
  describe('NumberTypeOptional', () => {
    describe('Correct', () => {
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
    });
    describe('Error', () => {
      errorTypeValidatorSpec(NumberTypeOptional, {
        canBeNumber: {
          constraints: {
            canBeNumber: 'NumberTypeOptional must be a number',
          },
          values: ['random', true, false, '', '   ', [], {}, [1, 2, 3], new Date(), { value: 123 }, () => 123, Symbol('123'), new Function('return 123')],
        },
      });
    });
  });

  describe('AddValidate', () => {
    @AddValidate([{ validator: 'IsInt' }, { validator: 'Min', value: 10 }, { validator: 'Max', value: 20 }])
    class ValueObjectNumber extends AbstractNumberType {}

    describe('Correct', () => {
      typeValidationSpec(ValueObjectNumber, {
        value: [
          //valid number value
          [10, 10],
          [15, 15],
          [20, 20],
        ],
      });
    });
    describe('Error', () => {
      errorTypeValidatorSpec(ValueObjectNumber, {
        notNumber: {
          constraints: {
            canBeNumber: 'ValueObjectNumber must be a number',
            isInt: 'ValueObjectNumber must be an integer number',
            max: 'ValueObjectNumber must not be greater than 20',
            min: 'ValueObjectNumber must not be less than 10',
          },
          values: ['random', '21.1.1', true, false, '', '   ', [], {}, [1, 2, 3], new Date(), { value: 123 }, () => 123, Symbol('123'), new Function('return 123')],
        },
        isInt: {
          constraints: {
            isInt: 'ValueObjectNumber must be an integer number',
          },
          values: ['11.1', 11.1],
        },
      });
    });
  });

  describe('Expect Type', () => {
    it('string and null', () => {
      expectTypeOf<NumberTypeOptional['value']>().toEqualTypeOf<number | null>();
      expectTypeOf<number | null>().toEqualTypeOf<NumberTypeOptional['value']>();

      const instance1 = new NumberTypeOptional();
      expectTypeOf(instance1.value).toEqualTypeOf<number | null>();

      const instance2 = new NumberTypeOptional(42);
      expectTypeOf(instance2.value).toEqualTypeOf<number | null>();

      const instance3 = new NumberTypeOptional(null);
      expectTypeOf(instance3.value).toEqualTypeOf<number | null>();
    });

    it('string', () => {
      expectTypeOf<NumberTypeRequired['value']>().toEqualTypeOf<number>();
      expectTypeOf<number>().toEqualTypeOf<NumberTypeRequired['value']>();

      const instance2 = new NumberTypeRequired(42);
      expectTypeOf(instance2.value).toEqualTypeOf<number>();
    });
  });
});
