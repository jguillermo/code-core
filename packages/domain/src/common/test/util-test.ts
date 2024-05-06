import {isString} from "class-validator";

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

export function universalToString(value) {
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

export function titleGenerate(objectName: string, objectItem: any, result: any, property: string | null = null): string {
  const hastTwoValues = Array.isArray(objectItem) && objectItem.length === 2;
  const input = hastTwoValues ? objectItem[0] : '';
  const expectValue = hastTwoValues ? objectItem[1] : objectItem;
  const txtExpectValue = isString(expectValue) ? `'${expectValue}'` : universalToString(expectValue);
  let txtInput = isString(input) ? `'${input}'` : universalToString(input);
  if (!Array.isArray(objectItem)) {
    txtInput = '';
  }
  const titleObject = property ? `(new ${objectName}(${txtInput})).${property}()` : `${objectName}(${txtInput})`;
  if (result) {
    return `${titleObject} Expected: ${txtExpectValue}, but return: ${universalToString(result)}`;
  } else {
    return `validate ${titleObject} toEqual ${txtExpectValue}`;
  }
}

function validateFunction(vo: any, objectItem: any, property = null) {
  const hastTwoValues = Array.isArray(objectItem) && objectItem.length === 2;
  let result;
  let input = hastTwoValues ? objectItem[0] : '';
  let expectValue = hastTwoValues ? objectItem[1] : objectItem;
  it(titleGenerate(vo.name, objectItem, property), () => {
    try {
      if (property) {
        const type = hastTwoValues ? new vo(input) : new vo();
        result = type[property];
      } else {
        result = hastTwoValues ? vo(input) : vo();
      }
      expect(result).toEqual(expectValue);
    } catch (error) {
      throw new Error(titleGenerate(vo.name, objectItem, result, property));
    }
  });
}

export function utilTestSpec(vo: any, objectList: any[] | { [P: string]: any[] }) {
  if (Array.isArray(objectList)) {
    objectList.forEach((value) => {
      validateFunction(vo, value);
    });
  } else {
    for (const property in objectList) {
      objectList[property].forEach((value) => {
        validateFunction(vo, value, property);
      });
    }
  }

}
