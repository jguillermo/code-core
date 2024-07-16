import { errorTypeValidValueSpec, typeValidationSpec } from '../../common/test/util-test';
import { AbstractJsonType } from './abstract-json-type';
import { AddValidate } from '../../validator/decorator/type-validator';
import { JsonValidator } from '../../validator/decorator/custom/json-validator';
import { PrimitivesKeys, skipByType } from '../../common/test/values-test';

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
      const errorData = {
        canBeJson: 'JsonTypeRequired must be a object or a valid JSON string.',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(JsonTypeRequired, errorData, [
        {
          constraints: ['canBeJson'],
          values: [...skipByType(PrimitivesKeys.OBJECT), {}],
        },
      ]);
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
        email: { type: 'string', format: 'email' },
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
      const errorData = {
        jsonValidator: 'JsonTypeValidateRequired error in valid json schema: /email must match format "email"',
      };
      errorTypeValidValueSpec<keyof typeof errorData>(JsonTypeValidateRequired, errorData, [
        {
          constraints: ['jsonValidator'],
          values: [{ a: 20, email: 'holi' }],
        },
      ]);
    });
  });
});
