function universalToString(value) {
    if (value === null) {
        return 'null';
    } else if (value === undefined) {
        return 'undefined';
    } else if (typeof value === 'number' && isNaN(value)) {
        return 'NaN';
    } else if (typeof value === 'object') {
        if (value instanceof Date) {
            return `Date(${value.toISOString()})`;
        } else if (value instanceof Map) {
            const entries = Array.from(value, ([key, val]) => `[${key}, ${universalToString(val)}]`);
            return `Map(${entries.join(', ')})`;
        } else if (value instanceof Set) {
            const entries = Array.from(value, universalToString);
            return `Set(${entries.join(', ')})`;
        } else {
            try {
                return JSON.stringify(value) || value.toString();
            } catch (error) {
                return '[Circular or too complex to stringify]';
            }
        }
    } else if (typeof value === 'function') {
        return `Function(${value.name || 'anonymous'})`;
    } else if (typeof value === 'symbol') {
        return value.toString();
    }

    return String(value);
}


export function utilTest(vo: any, objectList: { [P: string]: any[] }) {
    for (const property in objectList) {
        objectList[property].forEach((value) => {
            let type;
            let result;
            let input = Array.isArray(value) && value.length === 2 ? value[0] : '';
            let expectValue = Array.isArray(value) && value.length === 2 ? value[1] : value;
            it(`validates (new ${vo.name}(${universalToString(input)})).${property}() toEqual ${universalToString(expectValue)}`, () => {
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
                    throw new Error(`(new ${vo.name}(${universalToString(input)})).${property}() Expected: ${universalToString(expectValue)}, but return: ${universalToString(result)}.`);
                }
            });

        });
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
