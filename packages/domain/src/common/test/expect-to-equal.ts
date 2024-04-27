export function expectToEqual(vo: any, property: string, values: any[]) {
    values.forEach((value) => {
        let type;
        if (Array.isArray(value) && value.length === 2) {
            type = new vo(value[0]);
            expect(type[property]).toEqual(value[1]);
        } else {
            type = new vo();
            expect(type[property]).toEqual(value);
        }
    });
}
