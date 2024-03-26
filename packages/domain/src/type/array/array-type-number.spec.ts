import { ValueGenerator } from '../abstract-type.spec';
import { ArrayTypeNumber } from './array-type-number';

describe('Array Type Number', () => {
  let type: ArrayTypeNumber;
  describe('constructor set values', () => {
    describe('valid value', () => {
      it('[1, 1,2]', () => {
        type = new ArrayTypeNumber([1, 1.2]);
        expect(type.value).toEqual([1, 1.2]);
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = new ArrayTypeNumber();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new ArrayTypeNumber(undefined);
        expect(type.value).toEqual(null);
      });
    });
    describe('set invalid value', () => {
      it('string', () => {
        expect(() => {
          new ArrayTypeNumber(ValueGenerator.array(['a']));
        }).toThrow('a is not valid value in array.');
      });

      it('string', () => {
        expect(() => {
          new ArrayTypeNumber(ValueGenerator.valueString('a'));
        }).toThrow('value a is not a Array.');
      });
    });
  });
  describe('isNull', () => {
    it('null', () => {
      type = new ArrayTypeNumber();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new ArrayTypeNumber([1]);
      expect(type.isNull).toEqual(false);

      type = new ArrayTypeNumber([]);
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new ArrayTypeNumber(undefined);
      expect(type.isNull).toEqual(true);
    });
  });
  describe('toString', () => {
    describe('valid value', () => {
      it('true', () => {
        type = new ArrayTypeNumber([1, 2]);
        expect(type.toString).toEqual('1,2');
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = new ArrayTypeNumber();
        expect(type.toString).toEqual('');
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new ArrayTypeNumber(undefined);
        expect(type.toString).toEqual('');
      });
    });
  });
});
