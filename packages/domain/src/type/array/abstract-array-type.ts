import { AbstractType } from '../abstract-type';

export abstract class AbstractArrayType<T> extends AbstractType<Array<T>> {
  get toString(): string {
    return this.value ? this.value.toString() : '';
  }

  // @ts-ignore
  protected filter(value: any): Array<T> | null {
    if (!value) {
      return null;
    }
    if (!Array.isArray(value)) {
      throw new Error(`value ${value} is not a Array.`);
    }
    value.forEach((item: any) => {
      if (!this.itemValidator(item)) {
        throw new Error(`${item} is not valid value in array.`);
      }
    });
    return value;
  }

  protected abstract itemValidator(item: any): boolean;
}
