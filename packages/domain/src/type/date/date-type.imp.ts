import { DateType } from './';

export class DateTypeImp extends DateType {
  static create(value: any = null) {
    return new DateTypeImp(value);
  }
}
