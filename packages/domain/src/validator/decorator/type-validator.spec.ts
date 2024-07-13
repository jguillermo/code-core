import { AddValidate, validateType } from './type-validator';
import { errorTypeValidatorSpec, typeValidationSpec } from '../../common/test/util-test';

@AddValidate([
  {
    validator: 'MinLength',
    value: 3,
    options: { message: 'Name is too short' },
  },
  { validator: 'MaxLength', value: 20 },
])
class User {
  public _value: string;

  constructor(value: string) {
    this._value = value;
  }
}

describe('Validator', () => {
  it('error validator', async () => {
    const user = new User('J');
    const errors = await validateType(user);
    expect(errors.length).toEqual(1);
    expect(errors[0].property).toEqual('_value');
    expect(errors[0].constraints?.minLength).toBeDefined();
    expect(errors[0].constraints?.minLength).toEqual('Name is too short');
  });

  it('correct validator', async () => {
    const user = new User('John');
    const errors = await validateType(user);
    expect(errors.length).toEqual(0);
  });

  it('should add parent validator ', async () => {
    class ParentPArentClass {
      private _value: any;

      constructor(value: any) {
        this._value = value;
      }

      get value(): any {
        return this._value;
      }
    }

    @AddValidate([{ validator: 'IsNumber' }])
    class ParentClass extends ParentPArentClass {
      constructor(value: any) {
        super(value);
      }
    }

    @AddValidate([{ validator: 'IsInt' }])
    class ChildClass extends ParentClass {}

    // ValidationStorage.getInstance().log();

    const childInstance = new ChildClass('ChildClassStr'); // Esto debería fallar la validación IsInt
    const childErrors = await validateType(childInstance);
    // Validation error for '_value' property
    const valueError = childErrors.find((error) => error.property === '_value');
    expect(valueError).toBeDefined();
    expect(valueError?.constraints).toEqual({
      isNumber: 'ChildClass must be a number conforming to the specified constraints',
      isInt: 'ChildClass must be an integer number',
    });
  });

  describe('should validate herency class', () => {
    @AddValidate([{ validator: 'IsNumber' }, { validator: 'IsInt' }])
    class ParentParentClass {
      private _value: any;

      constructor(value: any) {
        this._value = value;
      }

      get value(): any {
        return this._value;
      }
    }

    @AddValidate([
      { validator: 'Min', value: 10 },
      { validator: 'Max', value: 20 },
    ])
    class ParentClass extends ParentParentClass {
      constructor(value: any) {
        super(value);
      }
    }

    class ChildClass extends ParentClass {}

    typeValidationSpec(ChildClass, {
      value: [
        //valid number value
        [10, 10],
        [15, 15],
        [20, 20],
      ],
    });

    errorTypeValidatorSpec(ChildClass, {
      notNumber: {
        constraints: {
          isInt: 'ChildClass must be an integer number',
          isNumber: 'ChildClass must be a number conforming to the specified constraints',
          max: 'ChildClass must not be greater than 20',
          min: 'ChildClass must not be less than 10',
        },
        values: ['random', '21.1.1', true, false, '', '   ', [], {}, [1, 2, 3], new Date(), { value: 123 }, () => 123, Symbol('123'), new Function('return 123')],
      },
      isInt: {
        constraints: {
          isInt: 'ChildClass must be an integer number',
        },
        values: [11.1],
      },
      max: {
        constraints: {
          max: 'ChildClass must not be greater than 20',
        },
        values: [50, 50.0],
      },
    });
  });
});
