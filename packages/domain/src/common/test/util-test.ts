export function utilTest(vo: any, objectList: { [P: string]: any[] }) {
    for (const property in objectList) {
        objectList[property].forEach((value) => {
            let type;
            let result;
            let input = Array.isArray(value) && value.length === 2? value[0]: '';
            let expectValue= Array.isArray(value) && value.length === 2? value[1]: value;
            it(`validates (new ${vo.name}(${JSON.stringify(input)})).${property}() toEqual ${JSON.stringify(expectValue)}`, () => {
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
                    throw new Error(`(new ${vo.name}(${JSON.stringify(input)})).${property}() Expected: ${JSON.stringify(expectValue)}, but return: ${JSON.stringify(result)}.`);
                }
            });

        });
    }
}

export function testValidation({validator, valid, invalid}) {
    it(`validates ${validator.name} correctly`, () => {
        valid.forEach(input => {
            let result;
            try {
                result = validator(input);
                expect(result).toBeTruthy();
            } catch (error) {
                throw new Error(`${validator.name}(${JSON.stringify(input)}). Expected: true, but return: ${result}.`);

            }
        });
    });

    it(`invalidates ${validator.name} correctly`, () => {
        invalid.forEach(input => {
            let result;
            try {
                result = validator(input);
                expect(result).toBeFalsy();
            } catch (error) {
                // Si falla la aserción, lanza un nuevo error con más información
                throw new Error(`Error in ${validator.name}(${JSON.stringify(input)}). Expected: false, but return: ${result}.`);

            }
        });
    });
}
