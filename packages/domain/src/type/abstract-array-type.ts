import { AbstractType } from './abstract-type';
import { AddValidate } from '../validator/decorator/type-validator';
import { DomainException } from '../exceptions';
import { PrimitiveType } from '../primitive/primitive-type';

@AddValidate([{ validator: 'IsArray' }])
export abstract class AbstractArrayType<T extends AbstractType<any>, R extends null | undefined = undefined> extends AbstractType<Array<PrimitiveType<T>>, R> {
  abstract getItemClass(value: PrimitiveType<T>): T;

  protected filter(value: any): any {
    if (value === null) {
      return null;
    }
    if (!Array.isArray(value)) {
      throw new DomainException(`value ${value} is not a Array.`);
    }
    return value.map((item: any) => this.getItemClass(item)).map((item) => item.value);
  }

  isValid(): boolean {
    return (
      super.isValid() && //data 1
      Array.isArray(this.value) && // dat 2
      this.value.every((item) => this.getItemClass(item).isValid())
    );
  }

  validatorMessageStr(separator: string = ',', customReplacement: string = ''): string {
    let str = super.validatorMessageStr(separator, customReplacement);

    const strItems = this.value?.map((item) => this.getItemClass(item).validatorMessageStr(separator, customReplacement));
    const filters = strItems?.filter((item) => item !== '');
    if (filters && filters.length > 0) {
      str += separator + filters.join(separator);
    }
    return str;
  }

  get toString(): string {
    return !this.value ? '' : this.value.map((item) => this.getItemClass(item).toString).join(', ');
  }
}
