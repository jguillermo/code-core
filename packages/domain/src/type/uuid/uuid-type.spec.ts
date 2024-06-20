import { ValueGenerator } from '../abstract-type.spec';
import { UuidTypeImp } from './';
import { validate as uuidValidate } from 'uuid';

const UUID_4_VALUE = 'df9ef000-21fc-4e06-b8f7-103c3a133d10';
describe('UUID Type', () => {
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
    it('null', () => {
      type = new UuidTypeImp(null);
      expect(type.toString).toEqual('');
    });

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
