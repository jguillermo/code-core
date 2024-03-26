import { UuidType } from '../uuid/';

export abstract class IdType extends UuidType<string> {
  protected override filter(value: any): string {
    if (value === null) {
      throw new Error(`is required.`);
    }
    return super.filter(value);
  }
}
