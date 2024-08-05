import { AddValidate } from '../../validator/decorator/type-validator';
import { AbstractDateType } from '@code-core/domain';
import { errorTypeValidValueSpec, typeValidationSpec, typeValidValueSpec } from '../../common/test/util-test';
import { canByType, PrimitivesKeys, skipByType } from '../../common/test/values-test';
import { expectTypeOf } from 'expect-type';

@AddValidate([{ validator: 'IsOptional' }])
class DateTypeOptional extends AbstractDateType<null> {
  constructor(value: Date | null = null) {
    super(value);
  }
}

class DateTypeRequired extends AbstractDateType {}

describe('AbstractDateType', () => {
  describe('DateTypeRequired', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(DateTypeRequired, canByType(PrimitivesKeys.DATE));
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeDate: 'DateTypeRequired must be a Date or a valid ISO 8601 date string',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(DateTypeRequired, errorData, [
        {
          constraints: ['canBeDate'],
          values: skipByType(PrimitivesKeys.DATE),
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(DateTypeRequired, {
        value: [
          ['2018-03-23T16:02:15.000Z', new Date('2018-03-23T16:02:15.000Z')],
          ['2018-03-23', new Date('2018-03-23T00:00:00.000Z')],
        ],
        isNull: [['2018-03-23T16:02:15.000Z', false]],
        toString: [['2018-03-23T16:02:15.000Z', '2018-03-23T16:02:15.000Z']],
      });
    });
  });
  describe('DateTypeOptional', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(DateTypeOptional, canByType(PrimitivesKeys.DATE, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED));
    });
    describe('Invalid Values', () => {
      const errorData = {
        canBeDate: 'DateTypeOptional must be a Date or a valid ISO 8601 date string',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(DateTypeOptional, errorData, [
        {
          constraints: ['canBeDate'],
          values: skipByType(PrimitivesKeys.DATE, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED),
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(DateTypeOptional, {
        value: [
          ['2018-03-23T16:02:15.000Z', new Date('2018-03-23T16:02:15.000Z')],
          ['2018-03-23', new Date('2018-03-23T00:00:00.000Z')],
          [null, null],
          [undefined, null],
        ],
        isNull: [
          ['2018-03-23T16:02:15.000Z', false],
          [null, true],
          [undefined, true],
        ],
        toString: [
          ['2018-03-23T16:02:15.000Z', '2018-03-23T16:02:15.000Z'],
          [null, ''],
          [undefined, ''],
        ],
      });
    });
  });
  describe('Expect Type', () => {
    type ExpectType = Date;
    it('boolean and null', () => {
      const instance1 = new DateTypeOptional(new Date());
      const instance2 = new DateTypeOptional();
      const instance3 = new DateTypeOptional(null);

      expectTypeOf<DateTypeOptional['value']>().toMatchTypeOf<ExpectType | null>();
      expectTypeOf<ExpectType | null>().toMatchTypeOf<DateTypeOptional['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance2.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance3.value).toMatchTypeOf<ExpectType | null>();
    });

    it('boolean', () => {
      const instance1 = new DateTypeRequired(new Date());

      expectTypeOf<DateTypeRequired['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<DateTypeRequired['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });
  });
});
