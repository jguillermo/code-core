import { AbstractType, ValueTypeNullable } from './abstract-type';

export class ValueGenerator {
  static valueString(value: string): any {
    return value;
  }

  static valueBoolean(value: boolean): any {
    return value;
  }

  static valueNumber(value: number): any {
    return value;
  }

  static array(value: Array<any>): any {
    return value;
  }
}

class TestBaseType extends AbstractType<ValueTypeNullable<string>> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return <string>this.value;
  }

  protected filter(value: any): string | null {
    if (value === null) {
      return null;
    }
    return `${value}`;
  }
}

describe('String Type', () => {
  it('should be', () => {
    expect(ValueGenerator.valueString('string')).toEqual('string');
    expect(ValueGenerator.valueBoolean(true)).toEqual(true);
    expect(ValueGenerator.valueBoolean(false)).toEqual(false);
    expect(ValueGenerator.valueNumber(0)).toEqual(0);
    expect(ValueGenerator.valueNumber(1)).toEqual(1);
  });
});

describe('TestBaseType', () => {
  it('is null', () => {
    const object = new TestBaseType();
    expect(object.isNull).toEqual(true);
  });

  it('is not null', () => {
    const object = new TestBaseType();
    expect(object.isNotNull).toEqual(false);
  });

  it('valid', () => {
    const object = new TestBaseType();
    expect(object.isValid()).toEqual(true);
  });

  it('valid default message', () => {
    const object = new TestBaseType();
    expect(object.validatorMessage()).toEqual('value ($value) is not valid.');
  });
});
