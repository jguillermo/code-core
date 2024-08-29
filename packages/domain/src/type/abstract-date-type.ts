import { AbstractType } from './abstract-type';
import { AddValidate } from '../validator/decorator/type-validator';
import { CanBeDate } from '../validator/decorator/custom/can-be-date';
import { DateValidator } from '../validator/primitive-validator/date.validator';

@AddValidate([{ validator: CanBeDate }])
export class AbstractDateType<R extends null | undefined = undefined> extends AbstractType<Date, R> {
  protected filter(value: any): any {
    if (DateValidator.canBeDate(value)) {
      return typeof value === 'string' ? new Date(value) : value;
    }
    return value;
  }

  get toString(): string {
    return this.value instanceof Date ? this.value.toISOString() : super.toString;
  }
}
