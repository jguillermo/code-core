import { ValidationArguments, ValidationError, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { validateType } from '../decorator/type-validator';
import { universalToString } from '../../common/utils/string/universal-to-string';

@ValidatorConstraint({ name: 'domainValidator', async: false })
export class DomainValidator implements ValidatorConstraintInterface {
  private static factoryType(value: any, objClass: any): ValidationError[] {
    const type = new objClass(value);
    return validateType(type);
  }

  validate(value: any, args: ValidationArguments): boolean {
    try {
      const errors = DomainValidator.factoryType(value, args.constraints[0]);
      return errors.length === 0;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    try {
      const errors = DomainValidator.factoryType(args.value, args.constraints[0]);
      return errors.map((error) => universalToString(error.constraints)).join(', ');
    } catch (e) {
      return 'Validation error';
    }
  }
}
