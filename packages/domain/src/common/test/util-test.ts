import {isString} from "class-validator";

interface ITestValidation {
  hastTwoValues: boolean,
  title: string,
  input: any,
  expectValue: any
}

export function testValidation({validator, valid, invalid}) {
  functionTestSpec(validator, valid.map(value => [value, true]));
  functionTestSpec(validator, invalid.map(value => [value, false]));
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

export function splitString(input): { name: string | null, property: string | null } {
  const [name, property] = input.split(':');
  return {
    name: name || null,
    property: property || null
  };
}

export function titleGenerate(objectName: string, input: any, expectValue: any, hastTwoValues: boolean, result: any = null): string {

  const txtExpectValue = isString(expectValue) ? `'${expectValue}'` : universalToString(expectValue);
  let txtInput = isString(input) ? `'${input}'` : universalToString(input);
  if (!hastTwoValues) {
    txtInput = '';
  }
  const objectNameProperty = splitString(objectName);
  const titleObject = objectNameProperty.property ? `(new ${objectNameProperty.name}(${txtInput})).${objectNameProperty.property}()` : `${objectName}(${txtInput})`;
  if (result) {
    return `${titleObject} Expected: ${txtExpectValue}, but return: ${universalToString(result)}`;
  } else {
    return `validate ${titleObject} toEqual ${txtExpectValue}`;
  }
}


export function processValidator(name: string, objectItem: any, property: string | null = null): ITestValidation {
  const hastTwoValues = Array.isArray(objectItem) && objectItem.length === 2;
  const voProperties = property ? `${name}:${property}` : `${name}`;
  const input = hastTwoValues ? objectItem[0] : '';
  const expectValue = hastTwoValues ? objectItem[1] : objectItem;
  const title = titleGenerate(voProperties, input, expectValue, hastTwoValues);
  return {
    hastTwoValues,
    title,
    input,
    expectValue
  }
}


export function classTestSpec(cls: any, objectList: { [P: string]: any[] }) {
  for (const property in objectList) {
    objectList[property].forEach((value) => {
      const dataInput = processValidator(cls.name, value, property);
      it(dataInput.title, () => {
        const type = dataInput.hastTwoValues ? new cls(dataInput.input) : new cls();
        expect(type[property]).toEqual(dataInput.expectValue);
      });
    });
  }
}

export function functionTestSpec(fn: any, objectList: any[]) {
  objectList.forEach((value) => {
    const dataInput = processValidator(fn.name, value);
    it(dataInput.title, () => {
      const result = dataInput.hastTwoValues ? fn(dataInput.input) : fn();
      expect(result).toEqual(dataInput.expectValue);
    });
  });
}


export function toEqualArray(data: any[]) {
  data.forEach((value) => {
    expect(value[0]).toEqual(value[1]);
  });
}
