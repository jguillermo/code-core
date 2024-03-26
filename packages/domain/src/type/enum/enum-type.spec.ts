import { EnumType } from './';
import { ValueGenerator } from '../abstract-type.spec';

enum StatusString {
  UP = 'up',
  DOWN = 'down',
}

export class EnumTypeImp extends EnumType<StatusString> {
  constructor(value: keyof typeof StatusString | null | undefined = null) {
    super(EnumType.create<StatusString>(value, Object.values(StatusString)));
  }
}

describe('Enum Type', () => {
  let type: EnumTypeImp;
  describe('constructorset values', () => {
    describe('set valid choise', () => {
      it('up', () => {
        type = new EnumTypeImp(ValueGenerator.valueString('up'));
        expect(type.value).toEqual('up');
        expect(type.value).toEqual(StatusString.UP);
      });
      it('down', () => {
        type = new EnumTypeImp(ValueGenerator.valueString('down'));
        expect(type.value).toEqual('down');
        expect(type.value).toEqual(StatusString.DOWN);
      });
    });
    describe('null', () => {
      it('null', () => {
        type = new EnumTypeImp();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new EnumTypeImp(undefined);
        expect(type.value).toEqual(null);
      });
    });
    describe('set invalid value', () => {
      describe('choises', () => {
        it('OTHER', () => {
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueString('OTHER'));
          }).toThrow('value OTHER is not in Enum.');
        });
        it('empty', () => {
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueString(''));
          }).toThrow(`value  is not in Enum.`);
        });
      });
      describe('boolean', () => {
        it('true', () => {
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueBoolean(true));
          }).toThrow(`value true is not in Enum.`);
        });
        it('false', () => {
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueBoolean(false));
          }).toThrow(`value false is not in Enum.`);
        });
      });
      describe('number', () => {
        it('positive', () => {
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueNumber(1));
          }).toThrow(`value 1 is not in Enum.`);
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueNumber(1.1));
          }).toThrow(`value 1.1 is not in Enum.`);
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueNumber(0.1));
          }).toThrow(`value 0.1 is not in Enum.`);
        });

        it('negative', () => {
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueNumber(-1));
          }).toThrow(`value -1 is not in Enum.`);
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueNumber(-1.1));
          }).toThrow(`value -1.1 is not in Enum.`);
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueNumber(-0.1));
          }).toThrow(`value -0.1 is not in Enum.`);
        });

        it('zero', () => {
          expect(() => {
            new EnumTypeImp(ValueGenerator.valueNumber(0));
          }).toThrow(`value 0 is not in Enum.`);
        });
      });
    });
  });

  describe('isNull', () => {
    it('null', () => {
      type = new EnumTypeImp();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new EnumTypeImp(ValueGenerator.valueString('up'));
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new EnumTypeImp(undefined);
      expect(type.isNull).toEqual(true);
    });
  });

  describe('toString', () => {
    it('Empty string', () => {
      type = new EnumTypeImp(ValueGenerator.valueString('up'));
      expect(type.toString).toEqual('up');
    });
    it('no param', () => {
      type = new EnumTypeImp();
      expect(type.toString).toEqual('');
    });
    it('null', () => {
      type = new EnumTypeImp(null);
      expect(type.toString).toEqual('');
    });
  });
});
