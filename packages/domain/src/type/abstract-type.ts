import { universalToString } from '../common/utils/string/universal-to-string';
import { ValidatorInterface } from '../validator';

export abstract class AbstractType<T, R extends null | undefined = undefined> implements ValidatorInterface {
  protected _value: R extends null ? T | null : T;

  constructor(value: R extends null ? T | null : T) {
    this._value = this.filter(value ?? null);
  }

  get value(): R extends null ? T | null : T {
    return this._value;
  }

  get isNull(): boolean {
    return this._value === null;
  }

  get isNotNull(): boolean {
    return !this.isNull;
  }

  isValid(): boolean {
    return true;
  }

  validatorMessage(): string {
    return 'value ($value) is not valid.';
  }

  get toString(): string {
    return this.isNull ? '' : universalToString(this._value);
  }

  protected abstract filter(value: any | null): any | null;
}
