export class BooleanValidator {
  static canBeBoolean(value: any): boolean {
    if (typeof value === 'boolean') {
      return true;
    }
    if (typeof value === 'string') {
      value = value.toLowerCase().trim();
      if (value === 'false' || value === 'true') {
        return true;
      }
    }
    return false;
  }
}
