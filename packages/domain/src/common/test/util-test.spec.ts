import {splitString, testValidation, titleGenerate, toEqualArray, universalToString, utilTestSpec} from "./util-test";

describe('Util Test', () => {
  describe('universalToString', () => {
    utilTestSpec(universalToString, [
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
        [{a: 1}, '{"a":1}'],
        [new Map([[1, 'one'], [2, 'two']]), 'Map({1: one, 2: two})'],
        [new Set([1, 2, 3]), 'Set(1, 2, 3)'],
        [function example() {
        }, 'Function(example)'],
        [Symbol('sym'), 'Symbol(sym)'],
      ]
    );
  });
  it('splitString', () => {
    toEqualArray([
        [splitString('abc:def'), {name: 'abc', property: 'def'}],
        [splitString('abc:'), {name: 'abc', property: null}],
        [splitString('abc'), {name: 'abc', property: null}],
        [splitString(':def'), {name: null, property: 'def'}],
        [splitString(':'), {name: null, property: null}],
        [splitString(''), {name: null, property: null}],
      ]
    );
  });
  it('titleGenerate', () => {
    toEqualArray([
        //function
        [titleGenerate('abc', [1, 1]), 'validate abc(1) toEqual 1'],
        [titleGenerate('abc', ['1', 1]), "validate abc('1') toEqual 1"],
        [titleGenerate('abc', ['1', '1']), "validate abc('1') toEqual '1'"],
        [titleGenerate('abc', 1), "validate abc() toEqual 1"],
        [titleGenerate('abc', '1'), "validate abc() toEqual '1'"],
        //error function
        [titleGenerate('abc', [1, 1], 1), 'abc(1) Expected: 1, but return: 1'],
        [titleGenerate('abc', ['1', 1], 1), "abc('1') Expected: 1, but return: 1"],
        [titleGenerate('abc', ['1', '1'], 1), "abc('1') Expected: '1', but return: 1"],
        [titleGenerate('abc', 1, 1), "abc() Expected: 1, but return: 1"],
        [titleGenerate('abc', '1', 1), "abc() Expected: '1', but return: 1"],

        //function:properties
        [titleGenerate('abc:def', [1, 1]), 'validate (new abc(1)).def() toEqual 1'],
        [titleGenerate('abc:def', ['1', 1]), "validate (new abc('1')).def() toEqual 1"],
        [titleGenerate('abc:def', ['1', '1']), "validate (new abc('1')).def() toEqual '1'"],
        [titleGenerate('abc:def', 1), "validate (new abc()).def() toEqual 1"],
        [titleGenerate('abc:def', '1'), "validate (new abc()).def() toEqual '1'"],
        //error function:properties
        [titleGenerate('abc:def', [1, 1], 1), '(new abc(1)).def() Expected: 1, but return: 1'],
        [titleGenerate('abc:def', ['1', 1], 1), "(new abc('1')).def() Expected: 1, but return: 1"],
        [titleGenerate('abc:def', ['1', '1'], 1), "(new abc('1')).def() Expected: '1', but return: 1"],
        [titleGenerate('abc:def', 1, 1), "(new abc()).def() Expected: 1, but return: 1"],
        [titleGenerate('abc:def', '1', 1), "(new abc()).def() Expected: '1', but return: 1"],
      ]
    );
  });
  describe('testValidation', () => {
    testValidation({
      validator: (value: any) => value === true,
      valid: [true],
      invalid: [false, 1, 0],
    });

  })
});
