export class NumberValidator {
  static isValid(item: any): boolean {
    return typeof item === 'number' || item instanceof Number;
  }
}
