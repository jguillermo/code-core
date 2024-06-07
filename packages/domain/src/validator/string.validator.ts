export class StringValidator {
  static isString(value: any): boolean {
    if (typeof value === 'string') {
      return true;
    }
    return false;
  }

  static canBeString(value: any): boolean {
    if (typeof value === 'string') {
      return true;
    }
    if (typeof value === 'number' && isFinite(value)) {
      return true;
    }
    return false;
  }
}
