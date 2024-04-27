import {NumberTypeImp} from './';
import {expectToEqual} from "../../common/test/expect-to-equal";

describe('Number Type', () => {
    it('expectValue', () => {
        expectToEqual(NumberTypeImp, 'value', [
            //valid number value
            [1, 1],
            [-1, -1],
            [1.1, 1.1],
            [-1.1, -1.1],
            [0, 0],
            //Empty
            null,
            [null, null],
            [undefined, null],
            //boolean
            [true, 1],
            [false, 0],
            //string
            ['', 0],
            ['1', 1],
            ['1.1', 1.1],
            ['-1', -1],
            ['-1.1', -1.1],
            ['0', 0],
            ['random', 0],
            ['string', 0],
        ]);
    });

    it('isNull', () => {
        expectToEqual(NumberTypeImp, 'isNull', [
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
            ['', false],
            ['1', false],
        ]);
    });

    it('toString', () => {
        expectToEqual(NumberTypeImp, 'toString', [
            //valid number value
            [1, '1'],
            [-1, '-1'],
            [1.1, '1.1'],
            [-1.1, '-1.1'],
            [0, '0'],
            //Empty
            '',
            [null, ''],
            [undefined, ''],
            //boolean
            [true, '1'],
            [false, '0'],
            //string
            ['', '0'],
            ['1', '1'],
            ['1.1', '1.1'],
            ['-1', '-1'],
            ['-1.1', '-1.1'],
            ['0', '0'],
            ['random', '0'],
            ['string', '0'],
        ]);
    });
});
