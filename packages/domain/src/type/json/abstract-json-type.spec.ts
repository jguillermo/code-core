import { typeErrorValidationSpec, typeValidationSpec } from '../../common/test/util-test';
import { AbstractJsonType } from './abstract-json-type';
import { AddValidate } from '../../validator/decorator/type-validator';
import { JsonValidator } from '../../validator/decorator/custom/json-validator';
import { JSONSchemaType } from 'ajv';

interface JsonValuesTest {
  a: number;
}

const jsonSchema: JSONSchemaType<JsonValuesTest> = {
  type: 'object',
  properties: {
    a: { type: 'number', minimum: 10 },
  },
  required: ['a'],
  additionalProperties: false,
};

@AddValidate([{ validator: JsonValidator, value: jsonSchema }])
class JsonTypeRequired extends AbstractJsonType<JsonValuesTest> {}

describe('AbstractJsonType', () => {
  describe('AbstractJsonType Required', () => {
    describe('Correct', () => {
      typeValidationSpec(JsonTypeRequired, {
        value: [
          [{ a: 11 }, { a: 11 }],
          ['{ "a": 11 }', { a: 11 }],
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
});
