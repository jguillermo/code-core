export class StringValidator {
  static isString(value: any): boolean {
    if (typeof value === 'string') {
      return true;
    }
    return false;
  }
}
