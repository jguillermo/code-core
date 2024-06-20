import { ValidatorInterface } from '@code-core/domain';

export abstract class AbstractType<T, R extends null | undefined = undefined>
  implements ValidatorInterface
{
  protected _value: R extends null ? T | null : T;

  constructor(
    value: R extends null ? T | null : T = null as R extends null
      ? T | null
      : T,
  ) {
    this._value = this.filter(value);
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

  abstract get toString(): string;

  protected abstract filter(
    value: R extends null ? T | null : T,
  ): R extends null ? T | null : T;
}
