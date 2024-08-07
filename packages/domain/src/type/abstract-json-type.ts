import { AbstractType } from './abstract-type';
import { AddValidate } from '../validator/decorator/type-validator';
import { JsonValidator } from '../validator/json.validator';
import { CanBeJson } from '../validator/decorator/custom/can-be-json';

export type JsonTypeValue = {};

@AddValidate([{ validator: CanBeJson }])
export class AbstractJsonType<T extends JsonTypeValue, R extends null | undefined = undefined> extends AbstractType<T, R> {
  protected filter(value: any): any {
    if (JsonValidator.canBeJson(value) && typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  }
}
