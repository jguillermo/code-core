import { typeValidationSpec } from '../../common/test/util-test';
import { AbstractJsonType } from './abstract-json-type';

interface JsonValuesTest {
  a: number;
}

class JsonTypeRequired extends AbstractJsonType<JsonValuesTest> {}

describe('AbstractJsonType', () => {
  describe('AbstractJsonType Required', () => {
    describe('Correct', () => {
      new JsonTypeRequired({ a: 1 }).value.a;

      typeValidationSpec(JsonTypeRequired, {
        value: [[{ a: 1 }, { a: 1 }]],
      });
    });
  });
});
