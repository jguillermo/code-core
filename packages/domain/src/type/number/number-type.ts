import {AbstractType, ValueTypeNullable} from '../abstract-type';
import {ValidationException} from "../../exceptions";
import {universalToString} from "../../common/utils/string/universal-to-string";
import {NumberValidator} from "../../common";

export abstract class NumberType extends AbstractType<ValueTypeNullable<number>> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }

  protected filter(value: any): number | null {
    if (value === null) {
      return null;
    }
    if (!NumberValidator.isNumeric(value)) {
      throw new ValidationException([`invalid number value: ${universalToString(value)}`]);
    }
    const number = Number(value);
    return isNaN(number) ? 0 : number.valueOf();
  }
}
