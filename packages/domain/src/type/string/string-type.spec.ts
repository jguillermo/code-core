import {StringTypeImp} from './';

function expectToEqual(vo: any, property: string, values: any[]) {
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

describe('String Type', () => {
    let type: StringTypeImp;
    it('expectValue', () => {
        expectToEqual(StringTypeImp, 'value', [
            //valid string value
            ['abc123', 'abc123'],
            ['áéíóú', 'áéíóú'],
            ['', ''],
            //Empty
            [null, null],
            [undefined, null],
            null,
            //boolean
            [true, 'true'],
            [false, 'false'],
            //number
            [1, '1'],
            [0, '0'],
            [-1, '-1'],
            [1.1, '1.1'],
            [0.1, '0.1'],
            [-0.1, '-0.1'],
            [-1.1, '-1.1'],
        ]);
    });

    describe('isNull', () => {
        it('null', () => {
            expectToEqual(StringTypeImp, 'isNull', [
                true,
                [undefined, true],
                [null, true],
                [0, false],
                [0.1, false],
                [1, false],
                [1.1, false],
                [false, false],
                [true, false],
                ['abc', false],
                ['0', false],
                ['1', false],
            ]);
        });
    });

    describe('isEmpty', () => {
        it('Empty string', () => {
            type = new StringTypeImp('');
            expect(type.isEmpty).toEqual(true);
        });
        it('no param', () => {
            type = new StringTypeImp();
            expect(type.isEmpty).toEqual(true);
        });
        it('null', () => {
            type = new StringTypeImp(null);
            expect(type.isEmpty).toEqual(true);
        });
        it('0', () => {
            type = new StringTypeImp('0');
            expect(type.isEmpty).toEqual(false);
        });
        it('false', () => {
            type = new StringTypeImp('false');
            expect(type.isEmpty).toEqual(false);
        });
    });
    describe('length', () => {
        it('Empty string', () => {
            type = new StringTypeImp('');
            expect(type.length).toEqual(0);
        });
        it('no param', () => {
            type = new StringTypeImp();
            expect(type.length).toEqual(0);
        });
        it('null', () => {
            type = new StringTypeImp(null);
            expect(type.length).toEqual(0);
        });
        it('alpha', () => {
            type = new StringTypeImp('abcdef');
            expect(type.length).toEqual(6);
        });
        it('special alpha', () => {
            type = new StringTypeImp('áéíóúñ');
            expect(type.length).toEqual(6);
        });
        it('0', () => {
            type = new StringTypeImp('0');
            expect(type.length).toEqual(1);
        });
        it('false', () => {
            type = new StringTypeImp('false');
            expect(type.length).toEqual(5);
        });
    });
    describe('toString', () => {
        it('Empty string', () => {
            type = new StringTypeImp('');
            expect(type.toString).toEqual('');
        });
        it('no param', () => {
            type = new StringTypeImp();
            expect(type.toString).toEqual('');
        });
        it('null', () => {
            type = new StringTypeImp(null);
            expect(type.toString).toEqual('');
        });
        it('alpha', () => {
            type = new StringTypeImp('abcdef');
            expect(type.toString).toEqual('abcdef');
        });
        it('special alpha', () => {
            type = new StringTypeImp('áéíóúñ');
            expect(type.toString).toEqual('áéíóúñ');
        });
        it('0', () => {
            type = new StringTypeImp('0');
            expect(type.toString).toEqual('0');
        });
        it('false', () => {
            type = new StringTypeImp('false');
            expect(type.toString).toEqual('false');
        });
    });
    describe('isLength', () => {
        describe('min', () => {
            it('Empty string', () => {
                type = new StringTypeImp('');
                expect(type.isLength({min: 0})).toEqual(true);
                expect(type.isLength({min: 1})).toEqual(false);
            });
            it('no param', () => {
                type = new StringTypeImp();
                expect(type.isLength({min: 0})).toEqual(true);
                expect(type.isLength({min: 1})).toEqual(false);
            });
            it('null', () => {
                type = new StringTypeImp(null);
                expect(type.isLength({min: 0})).toEqual(true);
                expect(type.isLength({min: 1})).toEqual(false);
            });
            it('alpha', () => {
                type = new StringTypeImp('abcdef');
                expect(type.isLength({min: 1})).toEqual(true);
            });
            it('special alpha', () => {
                type = new StringTypeImp('áéíóúñ');
                expect(type.isLength({min: 1})).toEqual(true);
            });
            it('0', () => {
                type = new StringTypeImp('0');
                expect(type.isLength({min: 1})).toEqual(true);
            });
            it('false', () => {
                type = new StringTypeImp('false');
                expect(type.isLength({min: 1})).toEqual(true);
            });
        });
        describe('max', () => {
            it('Empty string', () => {
                type = new StringTypeImp('');
                expect(type.isLength({max: 5})).toEqual(true);
            });
            it('no param', () => {
                type = new StringTypeImp();
                expect(type.isLength({max: 5})).toEqual(true);
            });
            it('null', () => {
                type = new StringTypeImp(null);
                expect(type.isLength({max: 5})).toEqual(true);
            });
            it('alpha', () => {
                type = new StringTypeImp('abcdef');
                expect(type.isLength({max: 5})).toEqual(false);
            });
            it('special alpha', () => {
                type = new StringTypeImp('áéíóúñ');
                expect(type.isLength({max: 6})).toEqual(true);
            });
            it('0', () => {
                type = new StringTypeImp('0');
                expect(type.isLength({max: 5})).toEqual(true);
            });
            it('false', () => {
                type = new StringTypeImp('false');
                expect(type.isLength({max: 5})).toEqual(true);
            });
        });
        describe('min - max', () => {
            it('Empty string', () => {
                type = new StringTypeImp('');
                expect(type.isLength({min: 1, max: 5})).toEqual(false);
            });
            it('no param', () => {
                type = new StringTypeImp();
                expect(type.isLength({min: 1, max: 5})).toEqual(false);
            });
            it('null', () => {
                type = new StringTypeImp(null);
                expect(type.isLength({min: 1, max: 5})).toEqual(false);
            });
            it('alpha', () => {
                type = new StringTypeImp('abcdef');
                expect(type.isLength({min: 1, max: 5})).toEqual(false);
            });
            it('special alpha', () => {
                type = new StringTypeImp('áéíóúñ');
                expect(type.isLength({min: 1, max: 6})).toEqual(true);
            });
            it('0', () => {
                type = new StringTypeImp('0');
                expect(type.isLength({min: 1, max: 5})).toEqual(true);
            });
            it('false', () => {
                type = new StringTypeImp('false');
                expect(type.isLength({min: 1, max: 5})).toEqual(true);
            });
        });
        describe('exactly', () => {
            it('Empty string', () => {
                type = new StringTypeImp('');
                expect(type.isLength({exactly: 0})).toEqual(true);
                expect(type.isLength({exactly: 1})).toEqual(false);
            });
            it('no param', () => {
                type = new StringTypeImp();
                expect(type.isLength({exactly: 0})).toEqual(true);
                expect(type.isLength({exactly: 1})).toEqual(false);
            });
            it('null', () => {
                type = new StringTypeImp(null);
                expect(type.isLength({exactly: 0})).toEqual(true);
                expect(type.isLength({exactly: 1})).toEqual(false);
            });
            it('alpha', () => {
                type = new StringTypeImp('abcdef');
                expect(type.isLength({exactly: 6})).toEqual(true);
                expect(type.isLength({exactly: 5})).toEqual(false);
            });
            it('special alpha', () => {
                type = new StringTypeImp('áéíóúñ');
                expect(type.isLength({exactly: 6})).toEqual(true);
                expect(type.isLength({exactly: 2})).toEqual(false);
            });
            it('0', () => {
                type = new StringTypeImp('0');
                expect(type.isLength({exactly: 1})).toEqual(true);
                expect(type.isLength({exactly: 0})).toEqual(false);
            });
            it('false', () => {
                type = new StringTypeImp('false');
                expect(type.isLength({exactly: 5})).toEqual(true);
                expect(type.isLength({exactly: 1})).toEqual(false);
            });
        });
        describe('error', () => {
            it('Empty string', () => {
                type = new StringTypeImp('');
                expect(type.isLength({})).toEqual(true);
            });
            it('no param', () => {
                type = new StringTypeImp();
                expect(type.isLength({})).toEqual(true);
            });
            it('null', () => {
                type = new StringTypeImp(null);
                expect(type.isLength({})).toEqual(true);
            });
            it('alpha', () => {
                type = new StringTypeImp('abcdef');
                expect(type.isLength({})).toEqual(true);
            });
        });
    });
});
