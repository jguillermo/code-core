import { errorTypeValidValueSpec, typeValidationSpec, typeValidValueSpec } from '../../common/test/util-test';
import { AddValidate } from '../../validator/decorator/type-validator';
import { AbstractNumberType } from '@code-core/domain';
import { expectTypeOf } from 'expect-type';
import { canByType, PrimitivesKeys, skipByType } from '../../common/test/values-test';

@AddValidate([{ validator: 'IsOptional' }])
class NumberTypeOptional extends AbstractNumberType<null> {
  constructor(value: number | null = null) {
    super(value);
  }
}

class NumberTypeRequired extends AbstractNumberType {}

describe('AbstractNumberType', () => {
  describe('NumberTypeRequired', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(NumberTypeRequired, canByType(PrimitivesKeys.NUMBER), 'number');
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeNumber: 'NumberTypeRequired must be a number',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(NumberTypeRequired, errorData, [
        {
          constraints: ['canBeNumber'],
          values: skipByType(PrimitivesKeys.NUMBER),
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
      };
      errorTypeValidValueSpec<keyof typeof errorData>(NumberTypeOptional, errorData, [
        {
          constraints: ['canBeNumber'],
          values: skipByType(PrimitivesKeys.NUMBER, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
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
      };
      errorTypeValidValueSpec<keyof typeof errorData>(ValueObjectNumber, errorData, [
        {
          constraints: ['max', 'min', 'isInt', 'canBeNumber'],
          values: skipByType(PrimitivesKeys.NUMBER, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
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
    it('number and null', () => {
      const instance1 = new NumberTypeOptional(42);
      const instance2 = new NumberTypeOptional();
      const instance3 = new NumberTypeOptional(null);

      expectTypeOf<NumberTypeOptional['value']>().toMatchTypeOf<number | null>();
      expectTypeOf<number | null>().toMatchTypeOf<NumberTypeOptional['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<number | null>();
      expectTypeOf(instance2.value).toMatchTypeOf<number | null>();
      expectTypeOf(instance3.value).toMatchTypeOf<number | null>();
    });

    it('number', () => {
      const instance1 = new NumberTypeRequired(42);

      expectTypeOf<NumberTypeRequired['value']>().toMatchTypeOf<number>();
      expectTypeOf<number>().toMatchTypeOf<NumberTypeRequired['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<number>();
    });
  });
});
