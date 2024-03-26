import { ValueGenerator } from '../abstract-type.spec';
import { StringTypeImp } from './';

describe('String Type', () => {
  let type: StringTypeImp;
  describe('constructorset values', () => {
    describe('set valid string', () => {
      it('alphabet', () => {
        type = new StringTypeImp('abc123');
        expect(type.value).toEqual('abc123');
      });
      it('especial caracter', () => {
        type = new StringTypeImp('áéíóú');
        expect(type.value).toEqual('áéíóú');
      });
      it('empty', () => {
        type = new StringTypeImp('');
        expect(type.value).toEqual('');
      });
    });
    describe('null', () => {
      it('null', () => {
        type = new StringTypeImp();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new StringTypeImp(undefined);
        expect(type.value).toEqual(null);
      });
    });
    describe('set invalid value', () => {
      describe('boolean', () => {
        it('true', () => {
          type = new StringTypeImp(ValueGenerator.valueBoolean(true));
          expect(type.value).toEqual('true');
        });
        it('false', () => {
          type = new StringTypeImp(ValueGenerator.valueBoolean(false));
          expect(type.value).toEqual('false');
        });
      });
      describe('number', () => {
        it('positive', () => {
          type = new StringTypeImp(ValueGenerator.valueNumber(1));
          expect(type.value).toEqual('1');
          type = new StringTypeImp(ValueGenerator.valueNumber(1.1));
          expect(type.value).toEqual('1.1');
          type = new StringTypeImp(ValueGenerator.valueNumber(0.1));
          expect(type.value).toEqual('0.1');
        });

        it('negative', () => {
          type = new StringTypeImp(ValueGenerator.valueNumber(-1));
          expect(type.value).toEqual('-1');
          type = new StringTypeImp(ValueGenerator.valueNumber(-1.1));
          expect(type.value).toEqual('-1.1');
          type = new StringTypeImp(ValueGenerator.valueNumber(-0.1));
          expect(type.value).toEqual('-0.1');
        });

        it('zero', () => {
          type = new StringTypeImp(ValueGenerator.valueNumber(0));
          expect(type.value).toEqual('0');
        });
      });
    });
  });

  describe('isNull', () => {
    it('null', () => {
      type = new StringTypeImp();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new StringTypeImp('abc');
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new StringTypeImp(undefined);
      expect(type.isNull).toEqual(true);
    });
  });

  describe('isEmpty', () => {
    it('Empty string', () => {
      type = new StringTypeImp('');
      expect(type.isEmpty).toEqual(true);
    });
    it('no param', () => {
      type = new StringTypeImp();
      expect(type.isEmpty).toEqual(true);
    });
    it('null', () => {
      type = new StringTypeImp(null);
      expect(type.isEmpty).toEqual(true);
    });
    it('0', () => {
      type = new StringTypeImp('0');
      expect(type.isEmpty).toEqual(false);
    });
    it('false', () => {
      type = new StringTypeImp('false');
      expect(type.isEmpty).toEqual(false);
    });
  });
  describe('length', () => {
    it('Empty string', () => {
      type = new StringTypeImp('');
      expect(type.length).toEqual(0);
    });
    it('no param', () => {
      type = new StringTypeImp();
      expect(type.length).toEqual(0);
    });
    it('null', () => {
      type = new StringTypeImp(null);
      expect(type.length).toEqual(0);
    });
    it('alpha', () => {
      type = new StringTypeImp('abcdef');
      expect(type.length).toEqual(6);
    });
    it('special alpha', () => {
      type = new StringTypeImp('áéíóúñ');
      expect(type.length).toEqual(6);
    });
    it('0', () => {
      type = new StringTypeImp('0');
      expect(type.length).toEqual(1);
    });
    it('false', () => {
      type = new StringTypeImp('false');
      expect(type.length).toEqual(5);
    });
  });
  describe('toString', () => {
    it('Empty string', () => {
      type = new StringTypeImp('');
      expect(type.toString).toEqual('');
    });
    it('no param', () => {
      type = new StringTypeImp();
      expect(type.toString).toEqual('');
    });
    it('null', () => {
      type = new StringTypeImp(null);
      expect(type.toString).toEqual('');
    });
    it('alpha', () => {
      type = new StringTypeImp('abcdef');
      expect(type.toString).toEqual('abcdef');
    });
    it('special alpha', () => {
      type = new StringTypeImp('áéíóúñ');
      expect(type.toString).toEqual('áéíóúñ');
    });
    it('0', () => {
      type = new StringTypeImp('0');
      expect(type.toString).toEqual('0');
    });
    it('false', () => {
      type = new StringTypeImp('false');
      expect(type.toString).toEqual('false');
    });
  });
  describe('isLength', () => {
    describe('min', () => {
      it('Empty string', () => {
        type = new StringTypeImp('');
        expect(type.isLength({ min: 0 })).toEqual(true);
        expect(type.isLength({ min: 1 })).toEqual(false);
      });
      it('no param', () => {
        type = new StringTypeImp();
        expect(type.isLength({ min: 0 })).toEqual(true);
        expect(type.isLength({ min: 1 })).toEqual(false);
      });
      it('null', () => {
        type = new StringTypeImp(null);
        expect(type.isLength({ min: 0 })).toEqual(true);
        expect(type.isLength({ min: 1 })).toEqual(false);
      });
      it('alpha', () => {
        type = new StringTypeImp('abcdef');
        expect(type.isLength({ min: 1 })).toEqual(true);
      });
      it('special alpha', () => {
        type = new StringTypeImp('áéíóúñ');
        expect(type.isLength({ min: 1 })).toEqual(true);
      });
      it('0', () => {
        type = new StringTypeImp('0');
        expect(type.isLength({ min: 1 })).toEqual(true);
      });
      it('false', () => {
        type = new StringTypeImp('false');
        expect(type.isLength({ min: 1 })).toEqual(true);
      });
    });
    describe('max', () => {
      it('Empty string', () => {
        type = new StringTypeImp('');
        expect(type.isLength({ max: 5 })).toEqual(true);
      });
      it('no param', () => {
        type = new StringTypeImp();
        expect(type.isLength({ max: 5 })).toEqual(true);
      });
      it('null', () => {
        type = new StringTypeImp(null);
        expect(type.isLength({ max: 5 })).toEqual(true);
      });
      it('alpha', () => {
        type = new StringTypeImp('abcdef');
        expect(type.isLength({ max: 5 })).toEqual(false);
      });
      it('special alpha', () => {
        type = new StringTypeImp('áéíóúñ');
        expect(type.isLength({ max: 6 })).toEqual(true);
      });
      it('0', () => {
        type = new StringTypeImp('0');
        expect(type.isLength({ max: 5 })).toEqual(true);
      });
      it('false', () => {
        type = new StringTypeImp('false');
        expect(type.isLength({ max: 5 })).toEqual(true);
      });
    });
    describe('min - max', () => {
      it('Empty string', () => {
        type = new StringTypeImp('');
        expect(type.isLength({ min: 1, max: 5 })).toEqual(false);
      });
      it('no param', () => {
        type = new StringTypeImp();
        expect(type.isLength({ min: 1, max: 5 })).toEqual(false);
      });
      it('null', () => {
        type = new StringTypeImp(null);
        expect(type.isLength({ min: 1, max: 5 })).toEqual(false);
      });
      it('alpha', () => {
        type = new StringTypeImp('abcdef');
        expect(type.isLength({ min: 1, max: 5 })).toEqual(false);
      });
      it('special alpha', () => {
        type = new StringTypeImp('áéíóúñ');
        expect(type.isLength({ min: 1, max: 6 })).toEqual(true);
      });
      it('0', () => {
        type = new StringTypeImp('0');
        expect(type.isLength({ min: 1, max: 5 })).toEqual(true);
      });
      it('false', () => {
        type = new StringTypeImp('false');
        expect(type.isLength({ min: 1, max: 5 })).toEqual(true);
      });
    });
    describe('exactly', () => {
      it('Empty string', () => {
        type = new StringTypeImp('');
        expect(type.isLength({ exactly: 0 })).toEqual(true);
        expect(type.isLength({ exactly: 1 })).toEqual(false);
      });
      it('no param', () => {
        type = new StringTypeImp();
        expect(type.isLength({ exactly: 0 })).toEqual(true);
        expect(type.isLength({ exactly: 1 })).toEqual(false);
      });
      it('null', () => {
        type = new StringTypeImp(null);
        expect(type.isLength({ exactly: 0 })).toEqual(true);
        expect(type.isLength({ exactly: 1 })).toEqual(false);
      });
      it('alpha', () => {
        type = new StringTypeImp('abcdef');
        expect(type.isLength({ exactly: 6 })).toEqual(true);
        expect(type.isLength({ exactly: 5 })).toEqual(false);
      });
      it('special alpha', () => {
        type = new StringTypeImp('áéíóúñ');
        expect(type.isLength({ exactly: 6 })).toEqual(true);
        expect(type.isLength({ exactly: 2 })).toEqual(false);
      });
      it('0', () => {
        type = new StringTypeImp('0');
        expect(type.isLength({ exactly: 1 })).toEqual(true);
        expect(type.isLength({ exactly: 0 })).toEqual(false);
      });
      it('false', () => {
        type = new StringTypeImp('false');
        expect(type.isLength({ exactly: 5 })).toEqual(true);
        expect(type.isLength({ exactly: 1 })).toEqual(false);
      });
    });
    describe('error', () => {
      it('Empty string', () => {
        type = new StringTypeImp('');
        expect(type.isLength({})).toEqual(true);
      });
      it('no param', () => {
        type = new StringTypeImp();
        expect(type.isLength({})).toEqual(true);
      });
      it('null', () => {
        type = new StringTypeImp(null);
        expect(type.isLength({})).toEqual(true);
      });
      it('alpha', () => {
        type = new StringTypeImp('abcdef');
        expect(type.isLength({})).toEqual(true);
      });
    });
  });
});
