import { typeErrorValidationSpec, typeValidationSpec } from '../../common/test/util-test';
import { AbstractJsonType } from './abstract-json-type';
import { AddValidate } from '../../validator/decorator/type-validator';
import { JsonValidator } from '../../validator/decorator/custom/json-validator';
import { JSONSchemaType } from 'ajv';

interface JsonValuesTest {
  a: number;
}

class JsonTypeRequired extends AbstractJsonType<JsonValuesTest> {}

describe('AbstractJsonType', () => {
  describe('AbstractJsonType Required', () => {
    describe('Correct', () => {
      typeValidationSpec(JsonTypeRequired, {
        value: [
          [{ a: 1 }, { a: 1 }],
          ['{ "a": 1 }', { a: 1 }],
        ],
      });
    });
    describe('Error', () => {
      typeErrorValidationSpec(JsonTypeRequired, {
        canBeJson: {
          constraints: {
            canBeJson: 'JsonTypeRequired must be a object or a valid JSON string.',
          },
          values: [null, undefined, 'random', true, false, '', '   ', [], {}, [1, 2, 3], new Date(), () => 123, Symbol('123'), new Function('return 123')],
        },
      });
    });
  });

  describe('Validate jsonSchema Required', () => {
    const jsonSchema: JSONSchemaType<JsonValuesTest> = {
      type: 'object',
      properties: {
        a: { type: 'number', minimum: 10 },
      },
      required: ['a'],
      additionalProperties: false,
    };

    @AddValidate([{ validator: JsonValidator, value: jsonSchema }])
    class JsonTypeValidateRequired extends AbstractJsonType<JsonValuesTest> {}

    describe('Correct', () => {
      typeValidationSpec(JsonTypeValidateRequired, {
        value: [
          [{ a: 11 }, { a: 11 }],
          ['{ "a": 11 }', { a: 11 }],
        ],
      });
    });
    describe('Error', () => {
      typeErrorValidationSpec(JsonTypeValidateRequired, {
        canBeJson: {
          constraints: {
            jsonValidator: 'JsonTypeValidateRequired error in valid json schema: /a must be >= 10',
          },
          values: [{ a: 1 }],
        },
      });
    });
  });
});
