import { functionTestSpec } from '../../test/util-test';
import { universalToString } from './universal-to-string';

describe('universalToString', () => {
  interface CircularObject {
    self?: CircularObject;
  }

  const circularObj: CircularObject = {};
  circularObj.self = circularObj;
  functionTestSpec(universalToString, [
    [null, 'null'],
    [undefined, 'undefined'],
    [123, '123'],
    [-Infinity, '-Infinity'],
    [Infinity, 'Infinity'],
    ['hello', 'hello'],
    [true, 'true'],
    [false, 'false'],
    [new Date('2020-01-01T00:00:00Z'), 'Date(2020-01-01T00:00:00.000Z)'],
    [[], '[]'],
    [[1, 2, 3], '[1,2,3]'],
    [{}, '{}'],
    [{ a: 1 }, '{"a":1}'],
    [
      new Map([
        [1, 'one'],
        [2, 'two'],
      ]),
      'Map({1: one, 2: two})',
    ],
    [new Set([1, 2, 3]), 'Set(1, 2, 3)'],
    [function example() {}, 'Function(example)'],
    [Symbol('sym'), 'Symbol(sym)'],
    [circularObj, '[Circular or too complex to stringify]'],
  ]);
});
