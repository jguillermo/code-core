import {AbstractType, ValueTypeNullable} from '../abstract-type';
import {ValidationException} from "../../exceptions";
import {universalToString} from "../../common/utils/string/universal-to-string";

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
    if (!NumberType.isNumeric(value)) {
      throw new ValidationException([`invalid number value: ${universalToString(value)}`]);
    }
    const number = Number(value);
    return isNaN(number) ? 0 : number.valueOf();
  }

  static isNumeric(value: any): boolean {
    // Verifica que el valor no sea null ni undefined
    if (value === null || value === undefined) {
      return false;
    }

    // Utiliza un solo chequeo de tipo y función integrada para la conversión y validación
    const type = typeof value;
    if (type === 'number') {
      // Retorna falso si el número es NaN o infinito
      return !isNaN(value) && isFinite(value);
    } else if (type === 'string' && value.trim() !== "") {
      // Intenta convertir la cadena a un número y verifica si es NaN y finito
      const num = Number(value);
      return !isNaN(num) && isFinite(num);
    }

    // Retorna falso para cualquier otro tipo, incluyendo objetos y arrays
    return false;
  }
}
