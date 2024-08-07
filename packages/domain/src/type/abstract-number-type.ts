import { AbstractType } from './abstract-type';
import { NumberValidator } from '../validator';
import { AddValidate } from '../validator/decorator/type-validator';
import { CanBeNumberValidator } from '../validator/decorator/custom/can-be-number';

@AddValidate([{ validator: CanBeNumberValidator }])
export class AbstractNumberType<R extends null | undefined = undefined> extends AbstractType<number, R> {
  protected filter(value: any): any {
    if (NumberValidator.canBeNumber(value)) {
      const number = Number(value);
      return isNaN(number) ? NaN : number.valueOf();
    }
    return value;
  }
}
