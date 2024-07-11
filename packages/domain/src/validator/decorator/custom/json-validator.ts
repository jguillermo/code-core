import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import Ajv from 'ajv';

import { JsonValidator as JsonValidatorCore } from '../../json.validator';

export function JsonValidator(jsonSchema: any, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'jsonValidator',
      target: object.constructor,
      constraints: [jsonSchema],
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: any) {
          if ((args as any).constraints[0].errors) {
            delete (args as any).constraints[0].errors;
          }
          if (!JsonValidatorCore.canBeJson(value)) {
            // esto parece raro, pero esta validacon ya esta en el canBeJson y aqui solo debeia llegar valores correctos, por eso no se valida, porque ya se valido antes y ya saliio eerror en al otro afuncion
            return true;
          }
          const ajv = new Ajv();
          const validate = ajv.compile(jsonSchema);
          const valid = validate(value);
          if (valid) {
            return true;
          } else {
            (args as any).constraints[0].errors = validate.errors;
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          const errors = (args.constraints[0] as any).errors;
          if (errors && errors.length > 0) {
            const errorMessages = errors.map((error) => `${error.instancePath} ${error.message}`).join(', ');
            return `${args.property} error in valid json schema: ${errorMessages}`;
          }
          return `${args.property} error in valid json schema must be object`;
        },
      },
    });
  };
}
