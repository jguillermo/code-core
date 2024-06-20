import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { NumberValidator } from '@code-core/domain';

export function CanBeNumberValidator(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'canBeNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          //args: ValidationArguments
          return NumberValidator.canBeNumber(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a number`;
        },
      },
    });
  };
}
