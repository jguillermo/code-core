import { ArrayType } from './array-type';
import {StringValidator} from "../../validator";

export class ArrayTypeString extends ArrayType<string> {
  protected itemValidator(item: any): boolean {
    return StringValidator.isString(item);
  }
}
