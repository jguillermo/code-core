import { ValidatorsDoc } from './validators-doc';
import { ValidatorMapI } from './validators-map';

describe('ValidatorsDoc.generatePropertySchema', () => {
  let validatorsDoc: ValidatorsDoc;

  beforeEach(() => {
    validatorsDoc = new ValidatorsDoc();
  });

  /**
   * Group: Numeric Validations
   */
  describe('Numeric Validations', () => {
    test('Min: should assign minimum', () => {
      const input: ValidatorMapI[] = [{ validator: 'Min', value: 5 }];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ minimum: 5, type: 'string' });
      expect(required).toBe(true);
    });

    test('Max: should assign maximum', () => {
      const input: ValidatorMapI[] = [{ validator: 'Max', value: 10 }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ maximum: 10, type: 'string' });
    });

    test('IsPositive: should assign minimum equal to 1', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsPositive' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ minimum: 1, type: 'string' });
    });

    test('IsNegative: should assign maximum equal to -1', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsNegative' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ maximum: -1, type: 'string' });
    });

    test('IsDivisibleBy: should assign multipleOf with the given value', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsDivisibleBy', value: 3 }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ multipleOf: 3, type: 'string' });
    });
  });

  /**
   * Group: String Validations
   */
  describe('String Validations', () => {
    test('MinLength: should assign minLength', () => {
      const input: ValidatorMapI[] = [{ validator: 'MinLength', value: 3 }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ minLength: 3, type: 'string' });
    });

    test('MaxLength: should assign maxLength', () => {
      const input: ValidatorMapI[] = [{ validator: 'MaxLength', value: 30 }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ maxLength: 30, type: 'string' });
    });

    test('Length: should assign minLength and maxLength from an array of two elements', () => {
      const input: ValidatorMapI[] = [{ validator: 'Length', value: [4, 8] }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ minLength: 4, maxLength: 8, type: 'string' });
    });

    test('Matches: should assign pattern using the regular expression', () => {
      const regex = /^[a-z]+$/;
      const input: ValidatorMapI[] = [{ validator: 'Matches', value: regex }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ pattern: regex.toString(), type: 'string' });
    });

    test('IsNotEmpty: should assign type "string" and minLength equal to 1', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsNotEmpty' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string', minLength: 1 });
    });

    test('Equals: should assign const with the provided value', () => {
      const input: ValidatorMapI[] = [{ validator: 'Equals', value: 'test' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ const: 'test', type: 'string' });
    });

    test('NotEquals: should assign "x-validate-NotEquals" with the given value', () => {
      const input: ValidatorMapI[] = [{ validator: 'NotEquals', value: 'noTest' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ 'x-validate-NotEquals': 'noTest', type: 'string' });
    });

    test('IsEmpty: should assign maxLength equal to 0', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsEmpty' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ maxLength: 0, type: 'string' });
    });
  });

  /**
   * Group: Format Validations
   */
  describe('Format Validations', () => {
    test('IsEmail: should assign type "string" and format "email"', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsEmail' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string', format: 'email' });
    });

    test('IsCreditCard: should assign type "string" and format "credit-card"', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsCreditCard' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string', format: 'credit-card' });
    });

    test('IsUUID: should assign type "string" and format "uuid"', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsUUID' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string', format: 'uuid' });
    });

    test('IsUrl: should assign type "string" and format "uri"', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsUrl' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string', format: 'uri' });
    });

    test('IsNumberString: should assign type "string" and pattern for digits', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsNumberString' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string', pattern: '^[0-9]+$' });
    });

    test('Generic format validators (e.g. IsAlpha): should assign type "string"', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsAlpha' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string' });
    });
  });

  /**
   * Group: Array Validations
   */
  describe('Array Validations', () => {
    test('IsArray: should assign type "array" and default items as { type: "string" }', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsArray' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'array', items: { type: 'string' } });
    });

    test('ArrayContains: should assign x-validate-ArrayContains with the given value', () => {
      const input: ValidatorMapI[] = [{ validator: 'ArrayContains', value: 'test' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ 'x-validate-ArrayContains': 'test', type: 'string' });
    });

    test('ArrayNotContains: should assign x-validate-ArrayNotContains with the given value', () => {
      const input: ValidatorMapI[] = [{ validator: 'ArrayNotContains', value: 'test' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ 'x-validate-ArrayNotContains': 'test', type: 'string' });
    });

    test('ArrayNotEmpty: should assign minItems equal to 1', () => {
      const input: ValidatorMapI[] = [{ validator: 'ArrayNotEmpty' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ minItems: 1, type: 'string' });
    });

    test('ArrayMinSize: should assign minItems equal to the given value', () => {
      const input: ValidatorMapI[] = [{ validator: 'ArrayMinSize', value: 2 }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ minItems: 2, type: 'string' });
    });

    test('ArrayMaxSize: should assign maxItems equal to the given value', () => {
      const input: ValidatorMapI[] = [{ validator: 'ArrayMaxSize', value: 5 }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ maxItems: 5, type: 'string' });
    });

    test('ArrayUnique: should assign uniqueItems to true', () => {
      const input: ValidatorMapI[] = [{ validator: 'ArrayUnique' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ uniqueItems: true, type: 'string' });
    });
  });

  /**
   * Group: Optional and Required Validations
   */
  describe('Optional and Required Validations', () => {
    test('IsOptional: should mark the property as not required', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsOptional' }];
      const { required } = validatorsDoc.generatePropertySchema(input);
      expect(required).toBe(false);
    });

    test('Combination: IsNotEmpty with IsOptional should mark as not required', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsNotEmpty' }, { validator: 'IsOptional' }];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      // Schema is generated with IsNotEmpty details but the presence of IsOptional makes it not required.
      expect(schema).toMatchObject({ type: 'string', minLength: 1 });
      expect(required).toBe(false);
    });

    test('Combination: Multiple required validators (IsNotEmpty, MinLength, IsEmail) should mark as required', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsNotEmpty' }, { validator: 'MinLength', value: 5 }, { validator: 'IsEmail' }];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      // No IsOptional is included, so property should be required.
      expect(schema).toMatchObject({ type: 'string', minLength: 5, format: 'email' });
      expect(required).toBe(true);
    });

    test('Combination: Conflicting validators with one IsOptional should mark as not required', () => {
      const input: ValidatorMapI[] = [
        { validator: 'MinLength', value: 8 },
        { validator: 'MaxLength', value: 20 },
        { validator: 'IsNotEmpty' },
        { validator: 'IsOptional' }, // This one makes the property not required.
      ];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string', minLength: 1, maxLength: 20 });
      expect(required).toBe(false);
    });

    test('Combination: Only required validators (e.g. IsNotEmpty and IsIn) should mark as required', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsNotEmpty' }, { validator: 'IsIn', value: ['red', 'green', 'blue'] }];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string', minLength: 1, enum: ['red', 'green', 'blue'] });
      expect(required).toBe(true);
    });

    test('Combination: Multiple validations without IsOptional should mark as required', () => {
      const input: ValidatorMapI[] = [{ validator: 'Min', value: 3 }, { validator: 'Max', value: 10 }, { validator: 'IsNotEmpty' }];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      // Since no IsOptional is present, the property is required.
      expect(schema).toMatchObject({ minimum: 3, maximum: 10, type: 'string', minLength: 1 });
      expect(required).toBe(true);
    });

    test('Combination: Required array validations (IsArray, ArrayNotEmpty) should mark as required', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsArray' }, { validator: 'ArrayNotEmpty' }];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'array', minItems: 1, items: { type: 'string' } });
      expect(required).toBe(true);
    });

    test('Combination: Array validations with IsOptional should mark as not required', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsArray' }, { validator: 'ArrayMinSize', value: 2 }, { validator: 'IsOptional' }];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'array', minItems: 2, items: { type: 'string' } });
      expect(required).toBe(false);
    });

    test('Complex Combination: Multiple validators for string with no IsOptional should mark as required', () => {
      const input: ValidatorMapI[] = [
        { validator: 'IsNotEmpty' },
        { validator: 'MinLength', value: 4 },
        { validator: 'MaxLength', value: 12 },
        { validator: 'Matches', value: /^[a-zA-Z]+$/ },
        { validator: 'IsEmail' }, // This sets format to email, though it might conflict with Matches.
      ];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      // In our mapping, later validations may override earlier ones for type/format.
      // But since there is no IsOptional, required should be true.
      expect(required).toBe(true);
      expect(schema.type).toBe('string');
      // At minimum, IsNotEmpty sets minLength to 1, but MinLength (value 4) should override that.
      expect(schema.minLength).toBe(4);
      // Format from IsEmail should prevail.
      expect(schema.format).toBe('email');
      // Pattern should come from Matches.
      expect(schema.pattern).toBe(/^[a-zA-Z]+$/.toString());
    });

    test('Complex Combination: Multiple validators for string with IsOptional present should mark as not required', () => {
      const input: ValidatorMapI[] = [
        { validator: 'IsNotEmpty' },
        { validator: 'MinLength', value: 4 },
        { validator: 'MaxLength', value: 12 },
        { validator: 'Matches', value: /^[a-zA-Z]+$/ },
        { validator: 'IsEmail' },
        { validator: 'IsOptional' },
      ];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      expect(required).toBe(false);
      // The schema should still include the validations.
      expect(schema.type).toBe('string');
      expect(schema.minLength).toBe(4);
      expect(schema.format).toBe('email');
      expect(schema.pattern).toBe(/^[a-zA-Z]+$/.toString());
    });
  });

  /**
   * Group: Date Validations and Other Special Cases
   */
  describe('Date Validations and Other Special Cases', () => {
    test('MinDate: should assign type "string", format "date-time" and x-minDate', () => {
      const input: ValidatorMapI[] = [{ validator: 'MinDate', value: '2020-01-01' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({
        type: 'string',
        format: 'date-time',
        'x-minDate': '2020-01-01',
      });
    });

    test('MaxDate: should assign type "string", format "date-time" and x-maxDate', () => {
      const input: ValidatorMapI[] = [{ validator: 'MaxDate', value: '2022-12-31' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({
        type: 'string',
        format: 'date-time',
        'x-maxDate': '2022-12-31',
      });
    });

    test('IsDate and IsDateString: should assign type "string" and format "date-time"', () => {
      const input1: ValidatorMapI[] = [{ validator: 'IsDate' }];
      const input2: ValidatorMapI[] = [{ validator: 'IsDateString' }];
      const { schema: schema1 } = validatorsDoc.generatePropertySchema(input1);
      const { schema: schema2 } = validatorsDoc.generatePropertySchema(input2);
      expect(schema1).toMatchObject({ type: 'string', format: 'date-time' });
      expect(schema2).toMatchObject({ type: 'string', format: 'date-time' });
    });
  });

  /**
   * Group: Extended Validators (No Direct Mapping)
   */
  describe('Extended Validators', () => {
    test('Allow: should assign x-validate-Allow with the given value', () => {
      const input: ValidatorMapI[] = [{ validator: 'Allow', value: 'anything' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ 'x-validate-Allow': 'anything', type: 'string' });
    });

    test('IsInstance: should assign x-validate-IsInstance with the given value', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsInstance', value: 'classRef' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ 'x-validate-IsInstance': 'classRef', type: 'string' });
    });

    test('Default: unknown validator should assign x-validate-UnknownValidator', () => {
      const input: ValidatorMapI[] = [{ validator: 'UnknownValidator' as any, value: 'unknown' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ 'x-validate-UnknownValidator': 'unknown', type: 'string' });
    });

    test('Fallback: with no validations, type should be "string"', () => {
      const input: ValidatorMapI[] = [];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string' });
    });
  });

  /**
   * Group: Advanced Combinations of Validations
   */
  describe('Advanced Combinations', () => {
    test('Combination: MinLength and MaxLength with IsNotEmpty (check order of application)', () => {
      // If IsNotEmpty is processed after MinLength, it is expected to override minLength to 1.
      const input: ValidatorMapI[] = [{ validator: 'MinLength', value: 5 }, { validator: 'MaxLength', value: 10 }, { validator: 'IsNotEmpty' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toEqual({ type: 'string', minLength: 1, maxLength: 10 });
    });

    test('Combination: IsPositive and Min (the last one should prevail)', () => {
      // If Min is processed first and then IsPositive, IsPositive should override minimum to 1.
      const input: ValidatorMapI[] = [{ validator: 'Min', value: 3 }, { validator: 'IsPositive' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toEqual({ type: 'string', minimum: 1 });
    });

    test('Combination: Multiple string format validators (IsEmail, Matches)', () => {
      const regex = /^[0-9]{4}$/;
      const input: ValidatorMapI[] = [{ validator: 'IsEmail' }, { validator: 'Matches', value: regex }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toEqual({ type: 'string', format: 'email', pattern: regex.toString() });
    });

    test('Combination: Optional with length validations', () => {
      // Combine optional validations with minLength and maxLength
      const input: ValidatorMapI[] = [{ validator: 'IsOptional' }, { validator: 'MinLength', value: 2 }, { validator: 'MaxLength', value: 20 }];
      const { schema, required } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ minLength: 2, maxLength: 20, type: 'string' });
      expect(required).toBe(false);
    });
  });

  /**
   * Group: Additional Generic String Format Validators
   */
  describe('Additional Generic String Format Validators', () => {
    test('IsAlphanumeric: should assign type "string"', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsAlphanumeric' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string' });
    });

    test('IsBase64: should assign type "string"', () => {
      const input: ValidatorMapI[] = [{ validator: 'IsBase64' }];
      const { schema } = validatorsDoc.generatePropertySchema(input);
      expect(schema).toMatchObject({ type: 'string' });
    });
  });
});
