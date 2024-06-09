import {NumberType, NumberTypeImp} from './';
import {classTestSpec, typeErrorValidationSpec, typeValidationSpec} from "../../common/test/util-test";
import {AddValidate} from "../../validator/decorator/type-validator";
import {validate} from "class-validator";

describe('Number Type', () => {
  describe('NumberTypeImp expect value', () => {
    typeValidationSpec(NumberTypeImp, {
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
    typeErrorValidationSpec(NumberTypeImp, {
      'canBeNumber': {
        constraints: {
          canBeNumber: '_value must be a number'
        },
        values: [
          [null, null],
          [undefined, null],
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
      {validator: "Min", value: 3},
      {validator: "Max", value: 20},
    ])
    class ValueObjectNumber extends NumberType {
    }

    it('should validate', async () => {
      const valueObjectNumber = new ValueObjectNumber('21.1.1');
      const errors = await validate(valueObjectNumber);
      expect(errors.length).toEqual(1);
      expect(errors[0].property).toEqual('_value');
      expect(errors[0].constraints.canBeNumber).toEqual('_value must be a number');
      expect(errors[0].constraints.isInt).toEqual('_value must be an integer number');
      expect(errors[0].constraints.min).toEqual('_value must not be less than 3');
      expect(errors[0].constraints.max).toEqual('_value must not be greater than 20');

    });
  });
});



