import { errorTypeValidValueSpec, typeValidationSpec, typeValidValueSpec } from '../common/test/util-test';
import { canByType, excludeItems, PrimitivesKeys, skipByType } from '../common/test/values-test';
import { expectTypeOf } from 'expect-type';
import { IdType, UuidTypeOptional, UuidTypeRequired } from '@code-core/domain';

const UUID_4_VALUE = 'df9ef000-21fc-4e06-b8f7-103c3a133d10';

describe('AbstractUuidType', () => {
  describe('IdType', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(IdType, canByType(PrimitivesKeys.UUID), 'string');
    });
    describe('Invalid Values', () => {
      const errorData = {
        isUuid: 'IdType must be a UUID',
        isNotEmpty: 'IdType should not be empty',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(IdType, errorData, [
        {
          constraints: ['isUuid'],
          values: excludeItems(skipByType(PrimitivesKeys.UUID, PrimitivesKeys.UNDEFINED, PrimitivesKeys.NULL), ['']),
        },
        {
          constraints: ['isUuid', 'isNotEmpty'],
          values: [...canByType(PrimitivesKeys.UNDEFINED, PrimitivesKeys.NULL), ''],
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(IdType, {
        value: [[UUID_4_VALUE, UUID_4_VALUE]],
        isNull: [[UUID_4_VALUE, false]],
        toString: [[UUID_4_VALUE, 'df9ef000-21fc-4e06-b8f7-103c3a133d10']],
      });
    });
  });
  describe('UuidTypeRequired', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(UuidTypeRequired, canByType(PrimitivesKeys.UUID), 'string');
    });
    describe('Invalid Values', () => {
      const errorData = {
        isUuid: 'UuidTypeRequired must be a UUID',
        isNotEmpty: 'UuidTypeRequired should not be empty',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(UuidTypeRequired, errorData, [
        {
          constraints: ['isUuid'],
          values: excludeItems(skipByType(PrimitivesKeys.UUID, PrimitivesKeys.UNDEFINED, PrimitivesKeys.NULL), ['']),
        },
        {
          constraints: ['isUuid', 'isNotEmpty'],
          values: [...canByType(PrimitivesKeys.UNDEFINED, PrimitivesKeys.NULL), ''],
        },
      ]);
    });
    describe('Compare values', () => {
      typeValidationSpec(UuidTypeRequired, {
        value: [[UUID_4_VALUE, UUID_4_VALUE]],
        isNull: [[UUID_4_VALUE, false]],
        toString: [[UUID_4_VALUE, 'df9ef000-21fc-4e06-b8f7-103c3a133d10']],
      });
    });
  });
  describe('UuidTypeOptional', () => {
    describe('Valid Values', () => {
      typeValidValueSpec(UuidTypeOptional, canByType(PrimitivesKeys.UUID, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED), 'string');
    });
    describe('Invalid Values', () => {
      const errorData = {
        isUuid: 'UuidTypeOptional must be a UUID',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(UuidTypeOptional, errorData, [
        {
          constraints: ['isUuid'],
          values: excludeItems(skipByType(PrimitivesKeys.UUID, PrimitivesKeys.NULL, PrimitivesKeys.UNDEFINED), [0, 1]),
        },
      ]);
    });
    describe('compare values', () => {
      typeValidationSpec(UuidTypeOptional, {
        value: [
          [UUID_4_VALUE, 'df9ef000-21fc-4e06-b8f7-103c3a133d10'],
          [null, null],
          [undefined, null],
        ],
        isNull: [
          [null, true],
          [undefined, true],
          [UUID_4_VALUE, false],
        ],
        toString: [
          [null, ''],
          [undefined, ''],
          [UUID_4_VALUE, 'df9ef000-21fc-4e06-b8f7-103c3a133d10'],
        ],
      });
    });
  });

  describe('Expect Type', () => {
    type ExpectType = string;
    it('string and null', () => {
      const instance1 = new UuidTypeOptional(UUID_4_VALUE);
      const instance2 = new UuidTypeOptional();
      const instance3 = new UuidTypeOptional(null);

      expectTypeOf<UuidTypeOptional['value']>().toMatchTypeOf<ExpectType | null>();
      expectTypeOf<ExpectType | null>().toMatchTypeOf<UuidTypeOptional['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance2.value).toMatchTypeOf<ExpectType | null>();
      expectTypeOf(instance3.value).toMatchTypeOf<ExpectType | null>();
    });

    it('string', () => {
      const instance1 = new UuidTypeRequired(UUID_4_VALUE);

      expectTypeOf<UuidTypeRequired['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<UuidTypeRequired['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });

    it('id', () => {
      const instance1 = new IdType(UUID_4_VALUE);

      expectTypeOf<IdType['value']>().toMatchTypeOf<ExpectType>();
      expectTypeOf<ExpectType>().toMatchTypeOf<IdType['value']>();
      expectTypeOf(instance1.value).toMatchTypeOf<ExpectType>();
    });
  });
});
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
////////////////////////// AbstractUuidType<R extends null | undefined = undefined> //////////////////////////
/*
describe.skip('UUID Type', () => {
  let type: UuidTypeImp;
  describe('constructorset values', () => {
    describe('set valid string', () => {
      it('random', () => {
        const value = UuidTypeImp.random();
        type = new UuidTypeImp(value);
        expect(type.value).toEqual(value);
      });
      it('uuid v4', () => {
        type = new UuidTypeImp(UUID_4_VALUE);
        expect(type.value).toEqual(UUID_4_VALUE);
      });
      it('uuid v5', () => {
        const value = UuidTypeImp.fromValue('hello');
        type = new UuidTypeImp(value);
        expect(type.value).toEqual(value);
      });
    });
    describe('null', () => {
      it('null', () => {
        type = new UuidTypeImp();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new UuidTypeImp(undefined);
        expect(type.value).toEqual(null);
      });
    });
    describe('set invalid value', () => {
      describe('string', () => {
        it('empty', () => {
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueString(''));
          }).toThrow(`invalid uuid value.`);
        });
        it('random', () => {
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueString('random'));
          }).toThrow(`invalid uuid value.`);
        });
        it('special carateres', () => {
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueString('áéíóú'));
          }).toThrow(`invalid uuid value.`);
        });
      });
      describe('boolean', () => {
        it('true', () => {
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueBoolean(true));
          }).toThrow(`invalid uuid value.`);
        });
        it('false', () => {
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueBoolean(false));
          }).toThrow(`invalid uuid value.`);
        });
      });
      describe('number', () => {
        it('positive', () => {
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueNumber(1));
          }).toThrow(`invalid uuid value.`);
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueNumber(1.1));
          }).toThrow(`invalid uuid value.`);
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueNumber(0.1));
          }).toThrow(`invalid uuid value.`);
        });

        it('negative', () => {
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueNumber(-1));
          }).toThrow(`invalid uuid value.`);
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueNumber(-1.1));
          }).toThrow(`invalid uuid value.`);
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueNumber(-0.1));
          }).toThrow(`invalid uuid value.`);
        });

        it('zero', () => {
          expect(() => {
            new UuidTypeImp(ValueGenerator.valueNumber(0));
          }).toThrow(`invalid uuid value.`);
        });
      });
    });
  });
  describe('isNull', () => {
    it('null', () => {
      type = new UuidTypeImp();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new UuidTypeImp(UUID_4_VALUE);
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new UuidTypeImp(undefined);
      expect(type.isNull).toEqual(true);
    });
  });

  describe('toString', () => {
    it('no param', () => {
      type = new UuidTypeImp();
      expect(type.toString).toEqual('');
    });
    // it('null', () => {
    //   type = new UuidTypeImp(null);
    //   expect(type.toString).toEqual('');
    // });

    it('uuid v4', () => {
      type = new UuidTypeImp(UUID_4_VALUE);
      expect(type.toString).toEqual(UUID_4_VALUE);
    });
  });

  describe('random', () => {
    it('uuid v4', () => {
      const value = UuidTypeImp.random();
      expect(uuidValidate(value)).toEqual(true);
    });
  });

  describe('fromValue', () => {
    it('message "hello" namespace dns default', () => {
      const value = UuidTypeImp.fromValue('hello');
      expect(uuidValidate(value)).toEqual(true);
      expect(value).toEqual('9342d47a-1bab-5709-9869-c840b2eac501');
    });
    it('message "hello" namespace owner', () => {
      const value = UuidTypeImp.fromValue('hello', '53b4661d-904b-41a7-906d-5892b658b2f6');
      expect(uuidValidate(value)).toEqual(true);
      expect(value).toEqual('71afd48d-b40e-5367-a007-1e7a76a3c2f1');
    });
  });
});
*/
