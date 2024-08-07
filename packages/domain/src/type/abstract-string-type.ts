import { AbstractType } from './abstract-type';
import { AddValidate } from '../validator/decorator/type-validator';
import { CanBeStringValidator } from '../validator/decorator/custom/can-be-string';
import { StringValidator } from '@code-core/domain';

@AddValidate([{ validator: CanBeStringValidator }])
export class AbstractStringType<R extends null | undefined = undefined> extends AbstractType<string, R> {
  protected filter(value: any): any {
    if (StringValidator.canBeString(value)) {
      if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
      } else {
        return `${value}`;
      }
    }
    return value;
  }
}
