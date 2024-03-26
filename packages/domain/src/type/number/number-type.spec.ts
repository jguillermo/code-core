import { ValueGenerator } from '../abstract-type.spec';
import { NumberTypeImp } from './';

describe('Number Type', () => {
  let type: NumberTypeImp;

  describe('constructorset values', () => {
    describe('valid number', () => {
      it('integer', () => {
        type = new NumberTypeImp(1);
        expect(type.value).toEqual(1);
      });
      it('integer negative', () => {
        type = new NumberTypeImp(-1);
        expect(type.value).toEqual(-1);
      });
      it('float', () => {
        type = new NumberTypeImp(1.1);
        expect(type.value).toEqual(1.1);
      });
      it('float negative', () => {
        type = new NumberTypeImp(-1.1);
        expect(type.value).toEqual(-1.1);
      });
      it('cero', () => {
        type = new NumberTypeImp(0);
        expect(type.value).toEqual(0);
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = new NumberTypeImp();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new NumberTypeImp(undefined);
        expect(type.value).toEqual(null);
      });
    });
    describe('set invalid value', () => {
      describe('boolean', () => {
        it('true', () => {
          type = new NumberTypeImp(ValueGenerator.valueBoolean(true));
          expect(type.value).toEqual(1);
        });
        it('false', () => {
          type = new NumberTypeImp(ValueGenerator.valueBoolean(false));
          expect(type.value).toEqual(0);
        });
      });
      describe('string', () => {
        it('empty', () => {
          type = new NumberTypeImp(ValueGenerator.valueString(''));
          expect(type.value).toEqual(0);
        });

        it('number positive', () => {
          type = new NumberTypeImp(ValueGenerator.valueString('1'));
          expect(type.value).toEqual(1);
          type = new NumberTypeImp(ValueGenerator.valueString('1.1'));
          expect(type.value).toEqual(1.1);
        });

        it('number negative', () => {
          type = new NumberTypeImp(ValueGenerator.valueString('-1'));
          expect(type.value).toEqual(-1);
          type = new NumberTypeImp(ValueGenerator.valueString('-1.1'));
          expect(type.value).toEqual(-1.1);
        });

        it('number Zero', () => {
          type = new NumberTypeImp(ValueGenerator.valueString('0'));
          expect(type.value).toEqual(0);
        });

        it('random', () => {
          type = new NumberTypeImp(ValueGenerator.valueString('random'));
          expect(type.value).toEqual(0);
        });
      });
    });
  });
  describe('isNull', () => {
    it('null', () => {
      type = new NumberTypeImp();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new NumberTypeImp(0);
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new NumberTypeImp(undefined);
      expect(type.isNull).toEqual(true);
    });
  });
  describe('toString', () => {
    describe('valid number', () => {
      it('integer', () => {
        type = new NumberTypeImp(1);
        expect(type.toString).toEqual('1');
      });
      it('integer negative', () => {
        type = new NumberTypeImp(-1);
        expect(type.toString).toEqual('-1');
      });
      it('float', () => {
        type = new NumberTypeImp(1.1);
        expect(type.toString).toEqual('1.1');
      });
      it('float negative', () => {
        type = new NumberTypeImp(-1.1);
        expect(type.toString).toEqual('-1.1');
      });
      it('cero', () => {
        type = new NumberTypeImp(0);
        expect(type.toString).toEqual('0');
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = new NumberTypeImp();
        expect(type.toString).toEqual('');
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new NumberTypeImp(undefined);
        expect(type.toString).toEqual('');
      });
    });
  });
});
