import {AbstractType, ValueTypeNullable} from '../abstract-type';
import {NumberValidator} from "../../validator";
import {AddValidate} from "../../validator/decorator/type-validator";
import {CanBeNumberValidator} from "../../validator/decorator/custom/can-be-number";

@AddValidate([
  {validator: CanBeNumberValidator},
])
export abstract class AbstractNumberType extends AbstractType<ValueTypeNullable<number>> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }

  protected filter(value: any): any | null {
    if (NumberValidator.canBeNumber(value)) {
      const number = Number(value);
      return isNaN(number) ? NaN : number.valueOf();
    }
    return value;
  }
}
