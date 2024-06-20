import { AbstractType } from '../abstract-type';
import { PrimitiveTypes } from '../../common';

export abstract class EnumType<T> extends AbstractType<T> {
  constructor(value: T | null) {
    // @ts-ignore
    super(value);
  }

  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return `${this.value}`;
  }

  // @ts-ignore
  protected filter(value: T | null): T | null {
    return value;
  }

  static create<PT>(
    value: PrimitiveTypes | PT,
    entries: PrimitiveTypes[],
  ): PT | null {
    if (value === null) {
      return null;
    }
    if (entries.filter((v) => v === value).length === 0) {
      throw new Error(`value ${value} is not in Enum.`);
    }
    return value as PT;
  }
}
