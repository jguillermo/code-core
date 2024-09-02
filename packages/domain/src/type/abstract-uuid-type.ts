import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { AbstractType } from './abstract-type';
import { AddValidate } from '../validator/decorator/type-validator';

const DNS_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

@AddValidate([{ validator: 'IsUUID' }])
export class AbstractUuidType<R extends null | undefined = undefined> extends AbstractType<string, R> {
  random(): string {
    return uuidv4();
  }

  fromValue(value: string, namespace: string = DNS_NAMESPACE): string {
    return uuidv5(value, namespace);
  }

  //todo is uud valid exception validator
  protected filter(value: any): any {
    return value;
  }
}

// @AddValidate([{ validator: CanBeBooleanValidator }])
// export class AbstractBooleanType<R extends null | undefined = undefined> extends AbstractType<boolean, R> {
//   protected filter(value: any): any {
//     if (BooleanValidator.canBeBoolean(value)) {
//       if (typeof value === 'string') {
//         value = value.toLowerCase().trim();
//         return value === 'true' || value === '1';
//       }
//       return !!value;
//     }
//     return value;
//   }
// }
