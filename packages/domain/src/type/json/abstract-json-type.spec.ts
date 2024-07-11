import { typeErrorValidationSpec, typeValidationSpec } from '../../common/test/util-test';
import { AbstractJsonType } from './abstract-json-type';
import { AddValidate } from '../../validator/decorator/type-validator';
import { JsonValidator } from '../../validator/decorator/custom/json-validator';

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
    interface JsonTypeValidateRequired extends JsonValuesTest {
      email: string;
    }

    const jsonSchema = {
      type: 'object',
      properties: {
        a: { type: 'number', minimum: 10 },
        email: { type: 'string' },
      },
      required: ['a', 'email'],
      additionalProperties: false,
    };

    @AddValidate([{ validator: JsonValidator, value: jsonSchema }])
    class JsonTypeValidateRequired extends AbstractJsonType<JsonValuesTest> {}

    describe('Correct', () => {
      typeValidationSpec(JsonTypeValidateRequired, {
        value: [
          [
            { a: 11, email: 'a@mail.com' },
            { a: 11, email: 'a@mail.com' },
          ],
        ],
      });
    });
    describe('Error', () => {
      typeErrorValidationSpec(JsonTypeValidateRequired, {
        canBeJson: {
          constraints: {
            jsonValidator: 'JsonTypeValidateRequired error in valid json schema: /a must be >= 10',
          },
          values: [{ a: 1, email: 'a@mail.com' }],
        },
      });
    });
  });
});
