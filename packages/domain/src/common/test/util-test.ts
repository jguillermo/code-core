import {isString} from "class-validator";

export function testValidation({validator, valid, invalid}) {

  valid.forEach(input => {
    validateFunction(validator, [input, true]);
  });

  invalid.forEach(input => {
    validateFunction(validator, [input, false]);
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

export function splitString(input): { name: string | null, property: string | null } {
  const [name, property] = input.split(':');
  return {
    name: name || null,
    property: property || null
  };
}

export function titleGenerate(objectName: string, objectItem: any, result: any = null): string {
  const hastTwoValues = Array.isArray(objectItem) && objectItem.length === 2;
  const input = hastTwoValues ? objectItem[0] : '';
  const expectValue = hastTwoValues ? objectItem[1] : objectItem;
  const txtExpectValue = isString(expectValue) ? `'${expectValue}'` : universalToString(expectValue);
  let txtInput = isString(input) ? `'${input}'` : universalToString(input);
  if (!Array.isArray(objectItem)) {
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

export function validateFunction(fn: any, objectItem: any) {
  const hastTwoValues = Array.isArray(objectItem) && objectItem.length === 2;
  const voProperties = `${fn.name}`;
  it(titleGenerate(voProperties, objectItem), () => {
    const input = hastTwoValues ? objectItem[0] : '';
    const expectValue = hastTwoValues ? objectItem[1] : objectItem;
    const result = hastTwoValues ? fn(input) : fn();
    expect(result).toEqual(expectValue);
  });
}

export function validateClass(cls: any, objectItem: any, property: string) {
  const hastTwoValues = Array.isArray(objectItem) && objectItem.length === 2;
  const voProperties = `${cls.name}:${property}`;
  it(titleGenerate(voProperties, objectItem), () => {
    const input = hastTwoValues ? objectItem[0] : '';
    const type = hastTwoValues ? new cls(input) : new cls();
    const result = type[property];
    const expectValue = hastTwoValues ? objectItem[1] : objectItem;
    expect(result).toEqual(expectValue);
  });
}

export function classTestSpec(cls: any, objectList: { [P: string]: any[] }) {
  for (const property in objectList) {
    objectList[property].forEach((value) => {
      validateClass(cls, value, property);
    });
  }
}

export function functionTestSpec(vo: any, objectList: any[]) {
  objectList.forEach((value) => {
    validateFunction(vo, value);
  });
}


export function toEqualArray(data: any[]) {
  data.forEach((value) => {
    expect(value[0]).toEqual(value[1]);
  });
}
