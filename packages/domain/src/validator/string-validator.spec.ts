import {StringValidator} from '@code-core/domain';
import {testValidation} from "../common/test/util-test";


describe('StringValidator', () => {
  describe('isString', () => {
    testValidation({
      validator: StringValidator.isString,
      valid: [
        '123', '-123', '   123   ', '0.456', '4e2', '0034', '+123',
        '', '   ', 'abc', '123abc', 'NaN', 'Infinity', 'undefined', 'null',
        '123.456.789', '123,456'
      ],
      invalid: [
        123, -123, 0, 0.456, 4e2, -1.2345e-2,
        0xFF, 0b111110111, 0o543,
        Number.MAX_VALUE, Number.MIN_VALUE, Number.EPSILON,
        NaN, Infinity, -Infinity, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY,
        true, false,
        null, undefined,
        {}, [], [123], new Date(), {value: 123}, [1, 2, 3],
        () => 123, Symbol('123'), new Function('return 123')
      ]
    });
  });
  describe('canBeString', () => {
    testValidation({
      validator: StringValidator.canBeString,
      valid: [
        '123', '-123', '   123   ', '0.456', '4e2', '0034', '+123',
        '', '   ', 'abc', '123abc', 'NaN', 'Infinity', 'undefined', 'null',
        '123.456.789', '123,456',
        123, -123, 0, 0.456, 4e2, -1.2345e-2,
        0xFF, 0b111110111, 0o543,
        Number.MAX_VALUE, Number.MIN_VALUE, Number.EPSILON
      ],
      invalid: [
        true, false,
        NaN, Infinity, -Infinity, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY,
        null, undefined,
        {}, [], [123], new Date(), {value: 123}, [1, 2, 3],
        () => 123, Symbol('123'), new Function('return 123')
      ]
    });
  });
});

