import {NumberType} from './';
import {typeErrorValidationSpec, typeValidationSpec} from "../../common/test/util-test";
import {AddValidate} from "../../validator/decorator/type-validator";


describe('Number Type', () => {
  describe('NumberTypeRequired expect value', () => {
    class NumberTypeRequired extends NumberType {
    }

    typeValidationSpec(NumberTypeRequired, {
        'value': [
          //valid number value
          [1, 1],
          [-1, -1],
          [1.1, 1.1],
          [-1.1, -1.1],
          [0, 0],
          //string
          ['1', 1],
          ['1.1', 1.1],
          ['-1', -1],
          ['-1.1', -1.1],
          ['0', 0],
        ],
        'isNull': [
          [0, false],
          [0.1, false],
          [1, false],
          [1.1, false],
          ['0', false],
          ['1', false],
        ],
        'toString': [
          //valid number value
          [1, '1'],
          [-1, '-1'],
          [1.1, '1.1'],
          [-1.1, '-1.1'],
          [0, '0'],
          //string
          ['1', '1'],
          ['1.1', '1.1'],
          ['-1', '-1'],
          ['-1.1', '-1.1'],
          ['0', '0'],
        ]
      }
    );
    typeErrorValidationSpec(NumberTypeRequired, {
      'canBeNumber': {
        constraints: {
          canBeNumber: '_value must be a number'
        },
        values: [
          null,
          undefined,
          'random',
          true,
          false,
          '',
          '   ',
          [],
          {},
          [1, 2, 3],
          new Date(),
          {value: 123},
          () => 123,
          Symbol('123'),
          new Function('return 123')
        ],
      }
    });
  });
  describe('NumberTypeOptional expect value', () => {
    @AddValidate([
      {validator: "IsOptional"},
    ])
    class NumberTypeOptional extends NumberType {
    }

    typeValidationSpec(NumberTypeOptional, {
        'value': [
          //valid number value
          [1, 1],
          [-1, -1],
          [1.1, 1.1],
          [-1.1, -1.1],
          [0, 0],
          null,
          [null, null],
          [undefined, null],
          //string
          ['1', 1],
          ['1.1', 1.1],
          ['-1', -1],
          ['-1.1', -1.1],
          ['0', 0],
        ],
        'isNull': [
          [null, true],
          [undefined, true],
          [0, false],
          [0.1, false],
          [1, false],
          [1.1, false],
          ['0', false],
          ['1', false],
        ],
        'toString': [
          [null, ''],
          [undefined, ''],
          //valid number value
          [1, '1'],
          [-1, '-1'],
          [1.1, '1.1'],
          [-1.1, '-1.1'],
          [0, '0'],
          //string
          ['1', '1'],
          ['1.1', '1.1'],
          ['-1', '-1'],
          ['-1.1', '-1.1'],
          ['0', '0'],
        ]
      }
    );
    typeErrorValidationSpec(NumberTypeOptional, {
      'canBeNumber': {
        constraints: {
          canBeNumber: '_value must be a number'
        },
        values: [
          'random',
          true,
          false,
          '',
          '   ',
          [],
          {},
          [1, 2, 3],
          new Date(),
          {value: 123},
          () => 123,
          Symbol('123'),
          new Function('return 123')
        ],
      }
    });
  });

  describe('AddValidate', () => {
    @AddValidate([
      {validator: "IsInt"},
      {validator: "Min", value: 10},
      {validator: "Max", value: 20},
    ])
    class ValueObjectNumber extends NumberType {
    }
    typeValidationSpec(ValueObjectNumber, {
        'value': [
          //valid number value
          [10, 10],
          [15, 15],
          [20, 20],
        ]
      }
    );

    typeErrorValidationSpec(ValueObjectNumber, {
      'notNumber': {
        constraints: {
          canBeNumber: "_value must be a number",
          isInt: "_value must be an integer number",
          max: "_value must not be greater than 20",
          min: "_value must not be less than 10"
        },
        values: [
          'random',
          '21.1.1',
          true,
          false,
          '',
          '   ',
          [],
          {},
          [1, 2, 3],
          new Date(),
          {value: 123},
          () => 123,
          Symbol('123'),
          new Function('return 123')
        ],
      },
      'isInt': {
        constraints: {
          isInt: "_value must be an integer number"
        },
        values: [
          '11.1',
          11.1
        ],
      }
    });

  });
});



