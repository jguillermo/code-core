import { ValidatorMapI } from './validators-map';

type MappingFunction = (schema: any, value?: any) => void;

export class ValidatorsDoc {
  // Precompiled mapping dictionaries as static readonly properties for faster access.
  private static readonly numericMappings: Record<string, MappingFunction> = {
    Min: (schema, value) => {
      schema.minimum = value;
    },
    Max: (schema, value) => {
      schema.maximum = value;
    },
    IsPositive: (schema) => {
      schema.minimum = 1;
    },
    IsNegative: (schema) => {
      schema.maximum = -1;
    },
    IsDivisibleBy: (schema, value) => {
      schema.multipleOf = value;
    },
  };

  private static readonly stringMappings: Record<string, MappingFunction> = {
    MinLength: (schema, value) => {
      schema.minLength = value;
    },
    MaxLength: (schema, value) => {
      schema.maxLength = value;
    },
    Length: (schema, value) => {
      if (Array.isArray(value) && value.length === 2) {
        schema.minLength = value[0];
        schema.maxLength = value[1];
      }
    },
    Matches: (schema, value) => {
      schema.pattern = value.toString();
    },
    Equals: (schema, value) => {
      schema.const = value;
    },
    NotEquals: (schema, value) => {
      schema['x-validate-NotEquals'] = value;
    },
    IsEmpty: (schema) => {
      schema.maxLength = 0;
    },
    IsNotEmpty: (schema) => {
      if (!schema.type || schema.type === 'string') {
        schema.type = 'string';
        schema.minLength = 1;
      }
    },
    IsIn: (schema, value) => {
      schema.enum = value;
    },
    IsNotIn: (schema, value) => {
      schema['x-validate-IsNotIn'] = value;
    },
  };

  private static readonly dateMappings: Record<string, MappingFunction> = {
    MinDate: (schema, value) => {
      schema.type = 'string';
      schema.format = 'date-time';
      schema['x-minDate'] = value;
    },
    MaxDate: (schema, value) => {
      schema.type = 'string';
      schema.format = 'date-time';
      schema['x-maxDate'] = value;
    },
    IsDate: (schema) => {
      schema.type = 'string';
      schema.format = 'date-time';
    },
    IsDateString: (schema) => {
      schema.type = 'string';
      schema.format = 'date-time';
    },
    IsNumberString: (schema) => {
      schema.type = 'string';
      schema.pattern = '^[0-9]+$';
    },
  };

  private static readonly arrayMappings: Record<string, MappingFunction> = {
    IsArray: (schema) => {
      schema.type = 'array';
      if (!schema.items) {
        schema.items = { type: 'string' };
      }
    },
    ArrayContains: (schema, value) => {
      schema['x-validate-ArrayContains'] = value;
    },
    ArrayNotContains: (schema, value) => {
      schema['x-validate-ArrayNotContains'] = value;
    },
    ArrayNotEmpty: (schema) => {
      schema.minItems = 1;
    },
    ArrayMinSize: (schema, value) => {
      schema.minItems = value;
    },
    ArrayMaxSize: (schema, value) => {
      schema.maxItems = value;
    },
    ArrayUnique: (schema) => {
      schema.uniqueItems = true;
    },
  };

  private static readonly extendedMappings: Record<string, MappingFunction> = {
    Allow: (schema, value) => {
      schema['x-validate-Allow'] = value;
    },
    IsInstance: (schema, value) => {
      schema['x-validate-IsInstance'] = value;
    },
  };

  private static readonly genericStringMappings: Record<string, MappingFunction> = {
    IsAlpha: (schema) => {
      schema.type = 'string';
    },
    IsAlphanumeric: (schema) => {
      schema.type = 'string';
    },
    IsAscii: (schema) => {
      schema.type = 'string';
    },
    IsBase32: (schema) => {
      schema.type = 'string';
    },
    IsBase58: (schema) => {
      schema.type = 'string';
    },
    IsBase64: (schema) => {
      schema.type = 'string';
    },
    IsBIC: (schema) => {
      schema.type = 'string';
    },
    IsCreditCard: (schema) => {
      schema.type = 'string';
      schema.format = 'credit-card';
    },
    IsCurrency: (schema) => {
      schema.type = 'string';
    },
    IsDataURI: (schema) => {
      schema.type = 'string';
    },
    IsFQDN: (schema) => {
      schema.type = 'string';
    },
    IsFullWidth: (schema) => {
      schema.type = 'string';
    },
    IsHalfWidth: (schema) => {
      schema.type = 'string';
    },
    IsHash: (schema) => {
      schema.type = 'string';
    },
    IsHexadecimal: (schema) => {
      schema.type = 'string';
    },
    IsHexColor: (schema) => {
      schema.type = 'string';
    },
    IsHSL: (schema) => {
      schema.type = 'string';
    },
    IsIBAN: (schema) => {
      schema.type = 'string';
    },
    IsIdentityCard: (schema) => {
      schema.type = 'string';
    },
    IsPassportNumber: (schema) => {
      schema.type = 'string';
    },
    IsPostalCode: (schema) => {
      schema.type = 'string';
    },
    IsMimeType: (schema) => {
      schema.type = 'string';
    },
    IsMobilePhone: (schema) => {
      schema.type = 'string';
    },
    IsMongoId: (schema) => {
      schema.type = 'string';
    },
    IsMultibyte: (schema) => {
      schema.type = 'string';
    },
    IsSurrogatePair: (schema) => {
      schema.type = 'string';
    },
    IsTaxId: (schema) => {
      schema.type = 'string';
    },
    IsUrl: (schema) => {
      schema.type = 'string';
      schema.format = 'uri';
    },
    IsMagnetURI: (schema) => {
      schema.type = 'string';
    },
    IsUUID: (schema) => {
      schema.type = 'string';
      schema.format = 'uuid';
    },
    IsFirebasePushId: (schema) => {
      schema.type = 'string';
    },
    IsTimeZone: (schema) => {
      schema.type = 'string';
    },
    IsSemVer: (schema) => {
      schema.type = 'string';
    },
    IsISSN: (schema) => {
      schema.type = 'string';
    },
    IsISRC: (schema) => {
      schema.type = 'string';
    },
    IsRFC3339: (schema) => {
      schema.type = 'string';
    },
    IsStrongPassword: (schema) => {
      schema.type = 'string';
    },
    IsEmail: (schema) => {
      schema.type = 'string';
      schema.format = 'email';
    },
  };

  // Combine all mapping dictionaries into one for fast lookup.
  private static readonly allMappings: Record<string, MappingFunction> = {
    ...ValidatorsDoc.numericMappings,
    ...ValidatorsDoc.stringMappings,
    ...ValidatorsDoc.dateMappings,
    ...ValidatorsDoc.arrayMappings,
    ...ValidatorsDoc.extendedMappings,
    ...ValidatorsDoc.genericStringMappings,
  };

  /**
   * Generates the OpenAPI schema fragment for a property based on an array of validations.
   * @param validators Array of validations (ValidatorMapI) for the property.
   * @returns An object with the schema definition and an "optional" flag.
   */
  public generatePropertySchema(validators: ValidatorMapI[]): { schema: any; required: boolean } {
    let schema: any = {};
    let requiredValue = true;

    for (let i = 0, len = validators.length; i < len; i++) {
      const { schema: partSchema, required: isReq } = this.mapValidator(validators[i]);
      if (!isReq) {
        requiredValue = false;
      }
      // Shallow merge; properties from partSchema override previous ones.
      schema = { ...schema, ...partSchema };
    }

    if (!schema.type) {
      schema.type = 'string';
    }
    return { schema, required: requiredValue };
  }

  /**
   * Maps a single validation (vData) to its corresponding schema fragment.
   * @param vData A single ValidatorMapI object.
   * @returns An object with a partial schema and a flag indicating if it's optional.
   */
  private mapValidator(vData: ValidatorMapI): { schema: any; required: boolean } {
    const schema: any = {};
    let required = true;
    let validatorName: string;

    if (typeof vData.validator === 'string') {
      validatorName = vData.validator;
    } else if (typeof vData.validator === 'function') {
      validatorName = vData.validator.name;
    } else {
      return { schema, required };
    }

    if (validatorName === 'IsOptional') {
      required = false;
    } else {
      const mapper = ValidatorsDoc.allMappings[validatorName];
      if (mapper) {
        mapper(schema, vData.value);
      } else {
        schema['x-validate-' + validatorName] = vData.value;
      }
    }

    return { schema, required };
  }
}
