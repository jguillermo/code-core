import { ValueGenerator } from '../abstract-type.spec';
import { ArrayTypeString } from './array-type-string';

describe('Array Type String', () => {
  let type: ArrayTypeString;
  describe('constructor set values', () => {
    describe('valid value', () => {
      it('["a","b"]', () => {
        type = new ArrayTypeString(['a', 'b']);
        expect(type.value).toEqual(['a', 'b']);
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = new ArrayTypeString();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new ArrayTypeString(undefined);
        expect(type.value).toEqual(null);
      });
    });
    describe('set invalid value', () => {
      it('string', () => {
        expect(() => {
          new ArrayTypeString(ValueGenerator.array([1]));
        }).toThrow('1 is not valid value in array.');
      });

      it('string', () => {
        expect(() => {
          new ArrayTypeString(ValueGenerator.valueString('a'));
        }).toThrow('value a is not a Array.');
      });
      it('number', () => {
        expect(() => {
          new ArrayTypeString(ValueGenerator.valueNumber(10));
        }).toThrow('value 10 is not a Array.');
      });
    });
  });
  describe('isNull', () => {
    it('null', () => {
      type = new ArrayTypeString();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new ArrayTypeString(['a']);
      expect(type.isNull).toEqual(false);

      type = new ArrayTypeString([]);
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new ArrayTypeString(undefined);
      expect(type.isNull).toEqual(true);
    });
  });
  describe('toString', () => {
    describe('valid value', () => {
      it('true', () => {
        type = new ArrayTypeString(['a', 'b']);
        expect(type.toString).toEqual('a,b');
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = new ArrayTypeString();
        expect(type.toString).toEqual('');
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new ArrayTypeString(undefined);
        expect(type.toString).toEqual('');
      });
    });
  });
});
