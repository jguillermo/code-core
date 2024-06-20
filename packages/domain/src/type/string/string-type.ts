import validator from 'validator';
import { AbstractType } from '../abstract-type';

export interface StringIsLengthValidator {
  min?: number;
  max?: number;
  exactly?: number;
}

export abstract class StringType extends AbstractType<string> {
  get isEmpty(): boolean {
    if (this.isNull) {
      return true;
    }
    return validator.isEmpty(<string>this.value);
  }

  get length(): number {
    if (this.isNull) {
      return 0;
    }
    return (<string>this.value).length;
  }

  isLength(param: StringIsLengthValidator): boolean {
    if (typeof param.exactly === 'number') {
      param.min = param.exactly;
      param.max = param.exactly;
    }
    return validator.isLength(this.toString, param);
  }

  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return <string>this.value;
  }

  // @ts-ignore
  protected filter(value: any): string | null {
    if (value === null) {
      return null;
    }
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    //todo validate object and array in string
    return `${value}`;
  }
}
