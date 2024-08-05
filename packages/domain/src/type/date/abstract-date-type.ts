import { AbstractType } from '../abstract-type';
import { AddValidate } from '../../validator/decorator/type-validator';
import { CanBeDate } from '../../validator/decorator/custom/can-be-date';
import { DateValidator } from '../../validator/date.validator';

@AddValidate([{ validator: CanBeDate }])
export class AbstractDateType<R extends null | undefined = undefined> extends AbstractType<Date, R> {
  protected filter(value: any): any {
    if (DateValidator.canBeDate(value)) {
      return typeof value === 'string' ? new Date(value) : value;
    }
    return value;
  }

  get toString(): string {
    return this.value instanceof Date ? this.value.toISOString() : super.toString;
  }
}


// import * as dayjs from 'dayjs';
// import * as utc from 'dayjs/plugin/utc';
// import { AbstractType } from '../abstract-type';
//
// dayjs.extend(utc);
//
// export abstract class AbstractDateType extends AbstractType<Date> {
//   constructor(value: any = null) {
//     super(value);
//   }
//
//   // @ts-ignore
//   protected filter(value: any): Date | null {
//     if (value === null) {
//       return null;
//     }
//     if (typeof value === 'boolean' || typeof value === 'number') {
//       throw new Error(`date is not valid.`);
//     }
//     const _dateAux = dayjs.utc(value);
//     if (!_dateAux.isValid()) {
//       throw new Error(`date is not valid.`);
//     }
//     return new Date(_dateAux.toISOString());
//   }
//
//   get toString(): string {
//     if (this.value === null) {
//       return '';
//     }
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     return this.value.toISOString();
//   }
// }
