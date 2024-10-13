import { universalToString } from '@code-core/common';
import { ValidatorInterface } from '../validator';
import { validateSync } from 'class-validator';

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
    return validateSync(this).length === 0;
  }

  validatorMessage(separate: string = ','): string {
    const errors = validateSync(this);
    return errors
      .map((error) => {
        if (error.constraints) {
          return Object.values(error.constraints)
            .map((message) => {
              return message.replace(`${error.property} `, '');
            })
            .join(`${separate} `);
        }
        return '';
      })
      .join(', ');
  }

  get toString(): string {
    return this.isNull ? '' : universalToString(this._value);
  }

  protected abstract filter(value: any | null): any | null;
}
