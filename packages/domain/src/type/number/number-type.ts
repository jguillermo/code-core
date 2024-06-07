import {AbstractType, ValueTypeNullable} from '../abstract-type';
import {NumberValidator} from "../../validator";
import {AddValidate} from "../../validator/decorator/type-validator";
import {ValidationException} from "../../exceptions";
import {universalToString} from "../../common/utils/string/universal-to-string";

@AddValidate([
  {validator: "IsNumber"},
])
export abstract class NumberType extends AbstractType<ValueTypeNullable<number>> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }

  protected filter(value: any): number | null {
    return value;
    if (value === null) {
      return null;
    }
    if (!NumberValidator.canBeNumber(value)) {
      throw new ValidationException([`invalid number value: ${universalToString(value)}`]);
    }
    const number = Number(value);
    return isNaN(number) ? NaN : number.valueOf();
  }
}
