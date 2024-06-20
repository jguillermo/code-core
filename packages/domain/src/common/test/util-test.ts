import { isString } from 'class-validator';
import { universalToString } from '../utils/string/universal-to-string';
import { validateType } from '../../validator/decorator/type-validator';

interface ITestValidation {
  hastTwoValues: boolean;
  title: string;
  input: any;
  expectValue: any;
}

export function testValidation({ validator, valid, invalid }) {
  functionTestSpec(
    validator,
    valid.map((value) => [value, true]),
  );
  functionTestSpec(
    validator,
    invalid.map((value) => [value, false]),
  );
}

export function splitString(input): {
  name: string | null;
  property: string | null;
} {
  const [name, property] = input.split(':');
  return {
    name: name || null,
    property: property || null,
  };
}

export function titleGenerate(
  objectName: string,
  input: any,
  expectValue: any,
  hastTwoValues: boolean,
  result: any = null,
): string {
  const txtExpectValue = isString(expectValue) ? `'${expectValue}'` : universalToString(expectValue);
  const txtInput = !hastTwoValues ? '' : isString(input) ? `'${input}'` : universalToString(input);
  const objectNameProperty = splitString(objectName);
  const titleObject = objectNameProperty.property
    ? `(new ${objectNameProperty.name}(${txtInput})).${objectNameProperty.property}()`
    : `${objectName}(${txtInput})`;
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
    expectValue,
  };
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

export function typeValidationSpec(cls: any, objectList: { [P: string]: any[] }) {
  for (const property in objectList) {
    objectList[property].forEach((value) => {
      const dataInput = processValidator(cls.name, value, property);
      it(dataInput.title + ' and not error', async () => {
        const type = dataInput.hastTwoValues ? new cls(dataInput.input) : new cls();
        expect(type[property]).toEqual(dataInput.expectValue);
        const errors = await validateType(type);
        expect(errors.length).toEqual(0);
      });
    });
  }
}

export function typeErrorValidationSpec(
  cls: any,
  exceptionList: {
    [P: string]: { constraints: object; values: any[] };
  },
) {
  for (const exceptionItem in exceptionList) {
    exceptionList[exceptionItem]['values'].forEach((value) => {
      const valueText = isString(value) ? `'${value}'` : universalToString(value);
      it(`type error validator ${exceptionItem} with ${valueText}`, async () => {
        const errors = await validateType(new cls(value));
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual(exceptionList[exceptionItem]['constraints']);
      });
    });
  }
}

export function classExceptionSpec(cls: any, exceptionList: { [P: string]: { message: string; values: any[] } }) {
  for (const exceptionItem in exceptionList) {
    exceptionList[exceptionItem]['values'].forEach((value) => {
      const valueText = isString(value) ? `'${value}'` : universalToString(value);
      it(`validate ${exceptionItem} exception with ${valueText}`, () => {
        expect(() => {
          new cls(value);
        }).toThrow(exceptionList[exceptionItem]['message']);
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
