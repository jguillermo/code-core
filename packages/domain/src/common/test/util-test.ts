export function utilTest(vo: any, objectList: { [P: string]: any[] }) {
    for (const property in objectList) {
        objectList[property].forEach((value) => {
            it(`validates ${vo.name} toEqual`, () => {
                let type;
                let result;
                let input;
                let expectValue;
                try {
                    if (Array.isArray(value) && value.length === 2) {
                        input = value[0];
                        type = new vo(input);
                        result = type[property];
                        expectValue = value[1];
                        expect(result).toEqual(expectValue);
                    } else {
                        input = '';
                        type = new vo();
                        result = type[property];
                        expectValue = value;
                        expect(result).toEqual(expectValue);
                    }
                } catch (error) {
                    throw new Error(`${vo.name}(${JSON.stringify(input)}).${property}() Expected: ${JSON.stringify(expectValue)}, but return: ${JSON.stringify(result)}.`);

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
