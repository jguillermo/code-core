import { AbstractType } from './abstract-type';
import { AddValidate } from '../validator/decorator/type-validator';
import { CanBeBooleanValidator } from '../validator/decorator/custom/can-be-boolean';
import { BooleanValidator } from '../validator/boolean.validator';

@AddValidate([{ validator: CanBeBooleanValidator }])
export class AbstractBooleanType<R extends null | undefined = undefined> extends AbstractType<boolean, R> {
  protected filter(value: any): any {
    if (BooleanValidator.canBeBoolean(value)) {
      if (typeof value === 'string') {
        value = value.toLowerCase().trim();
        return value === 'true' || value === '1';
      }
      return !!value;
    }
    return value;
  }
}
