export class StringValidator {
  static isValid(item: any): boolean {
    return typeof item === 'string' || item instanceof String;
  }
}
