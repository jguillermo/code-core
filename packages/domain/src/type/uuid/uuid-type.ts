import { v4 as uuidv4, v5 as uuidv5, validate as uuidValidate } from 'uuid';
import { AbstractType, ValueTypeNullable } from '../abstract-type';

const DNS_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

export abstract class UuidType<TT = ValueTypeNullable<string>> extends AbstractType<TT> {
  static random(): string {
    return uuidv4();
  }

  static fromValue(value: string, namespace: string = DNS_NAMESPACE): string {
    return uuidv5(value, namespace);
  }

  protected filter(value: any): TT {
    if (value === null) {
      return <TT>(<any>null);
    }
    if (typeof value !== 'string') {
      throw new Error(`invalid uuid value.`);
    }
    if (!uuidValidate(value)) {
      throw new Error(`invalid uuid value.`);
    }
    return <TT>value;
  }

  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return <string>this.value;
  }
}
