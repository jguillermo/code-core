import {NumberType, NumberTypeImp} from './';
import {testValidation, utilTest} from "../../common/test/util-test";

describe('Number Type', () => {
    describe('NumberTypeImp expect value', () => {
        utilTest(NumberTypeImp, {
                'value': [
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
                ],
                'isNull': [
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
                ],
                'toString': [
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
                ]
            }
        );
    });
    describe('validation isNumeric', () => {
        testValidation({
            validator: NumberType.isNumeric,
            valid: [
                123, -123, 0, 0.456, 4e2, -1.2345e-2,
                0xFF, 0b111110111, 0o543,  // Hexadecimal, Binary, Octal numbers
                '123', '-123', '   123   ', '0.456', '4e2', '0034', '+123', // Valid string representations
                Number.MAX_VALUE, Number.MIN_VALUE, Number.EPSILON // Numeric limits
            ],
            invalid: [
                NaN, Infinity, -Infinity, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY,
                '', '   ', 'abc', '123abc', 'NaN', 'Infinity', 'undefined', 'null',
                '123.456.789', '123,456', // Invalid string formats
                true, false,  // Boolean values
                null, undefined,  // Null and Undefined
                {}, [], [123], new Date(), {value: 123}, [1, 2, 3],  // Objects and Arrays
                () => 123, Symbol('123'), new Function('return 123')  // Other types
            ]
        });
    });
});



