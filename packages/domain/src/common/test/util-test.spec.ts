import {isString} from "class-validator";
import {IsString} from "class-validator/types/decorator/typechecker/IsString";

function universalToString(value) {
  if (value === null) {
    return 'null';
  } else if (value === undefined) {
    return 'undefined';
  } else if (typeof value === 'number' && isNaN(value)) {
    return 'NaN';
  } else if (value instanceof Date) {
    return `Date(${value.toISOString()})`;
  } else if (value instanceof Map) {
    const entries = Array.from(value, ([key, val]) => `${universalToString(key)}: ${universalToString(val)}`);
    return `Map({${entries.join(', ')}})`;
  } else if (value instanceof Set) {
    const entries = Array.from(value, universalToString);
    return `Set(${entries.join(', ')})`;
  } else if (typeof value === 'object') {
    try {
      return JSON.stringify(value) || value.toString();
    } catch (error) {
      return '[Circular or too complex to stringify]';
    }
  } else if (typeof value === 'function') {
    return `Function(${value.name || 'anonymous'})`;
  } else if (typeof value === 'symbol') {
    return value.toString();
  }

  return String(value);
}
//todo refactorizar la funcion para que sea mas sencilo dem mabener
export function utilTestSpec(vo: any, objectList: any[] | { [P: string]: any[] }) {
  if (Array.isArray(objectList)) {
    objectList.forEach((value) => {
      const hastTwoValues=Array.isArray(value) && value.length === 2;
      let result;
      let input = hastTwoValues ? value[0] : '';
      let expectValue = hastTwoValues ? value[1] : value;
      const txtExpectValue = isString(expectValue)? `'${expectValue}'`:universalToString(expectValue);
      const txtInput = isString(input)? `'${input}'`:universalToString(input);
      it(`validates ${vo.name}(${txtInput}) toEqual ${txtExpectValue}`, () => {
        try {
          if (hastTwoValues) {
            result = vo(input);
            expect(result).toEqual(expectValue);
          } else {
            result = new vo();
            expect(result).toEqual(expectValue);
          }
        } catch (error) {
          throw new Error(`(${vo.name}(${txtInput})) Expected: ${txtExpectValue}, but return: ${universalToString(result)}.`);
        }
      });
    });
  } else {
    for (const property in objectList) {
      objectList[property].forEach((value) => {
        let type;
        let result;
        let input = Array.isArray(value) && value.length === 2 ? value[0] : '';
        let expectValue = Array.isArray(value) && value.length === 2 ? value[1] : value;
        const txtExpectValue = isString(expectValue)? `'${expectValue}'`:universalToString(expectValue);
        const txtInput = isString(input)? `'${input}'`:universalToString(input);
        it(`validates (new ${vo.name}(${txtInput})).${property}() toEqual ${txtExpectValue}`, () => {
          try {
            if (Array.isArray(value) && value.length === 2) {
              type = new vo(input);
              result = type[property];
              expect(result).toEqual(expectValue);
            } else {
              type = new vo();
              result = type[property];
              expect(result).toEqual(expectValue);
            }
          } catch (error) {
            throw new Error(`(new ${vo.name}(${txtInput})).${property}() Expected: ${txtExpectValue}, but return: ${universalToString(result)}.`);
          }
        });

      });
    }
  }

}

export function testValidation({validator, valid, invalid}) {

  valid.forEach(input => {
    it(`validate expected: true ${validator.name}(${universalToString(input)})`, () => {
      let result;
      try {
        result = validator(input);
        expect(result).toBeTruthy();
      } catch (error) {
        throw new Error(`${validator.name}(${universalToString(input)}). Expected: true, but return: ${result}.`);
      }
    });
  });


  invalid.forEach(input => {
    it(`validate expected: false ${validator.name}(${universalToString(input)})`, () => {
      let result;
      try {
        result = validator(input);
        expect(result).toBeFalsy();
      } catch (error) {
        // Si falla la aserción, lanza un nuevo error con más información
        throw new Error(`Error in ${validator.name}(${universalToString(input)}). Expected: false, but return: ${result}.`);

      }
    });
  });
}


describe('Util Test', () => {
  describe('universalToString function tests', () => {
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
});
