import { ValidationArguments, ValidationError, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { validateType } from '../decorator/type-validator';
import { TypeValidatorInterface } from '../primitive-validator/type-validator-interface';

@ValidatorConstraint({ name: 'domainValidator', async: false })
export class DomainValidator implements ValidatorConstraintInterface {
  private static factoryType(value: any, objClass: any): ValidationError[] {
    const type = new objClass(value);
    return validateType(type);
  }

  validate(value: any, args: ValidationArguments): boolean {
    try {
      const type: TypeValidatorInterface = new args.constraints[0](value);
      return type.isValid();
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    try {
      const type: TypeValidatorInterface = new args.constraints[0](args.value);
      return type.validatorMessageStr();
    } catch (e) {
      return 'Validation error';
    }
  }
}
