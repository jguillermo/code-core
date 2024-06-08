import {AddValidate} from "./type-validator";
import {IsInt, IsNumber, validate} from 'class-validator';

@AddValidate([
    {validator: "MinLength", value: 3, options: {message: "Name is too short"}},
    {validator: "MaxLength", value: 20},
])
class User {
    public _value: string;
    constructor(value: string) {
        this._value = value;
    }
}

describe('Validator', () => {
    it('error validator', async () => {
        const user = new User("J");
        const errors = await validate(user);
        expect(errors.length).toEqual(1);
        expect(errors[0].property).toEqual('_value');
        expect(errors[0].constraints.minLength).toBeDefined();
        expect(errors[0].constraints.minLength).toEqual('Name is too short')

    });

    it('correct validator', async () => {
        const user = new User("John");
        const errors = await validate(user);
        expect(errors.length).toEqual(0);

    });
});

describe('Validator', () => {
    it('should ', async () => {
        class ParentPArentClass {
            private _value: any;

            constructor(value: any) {
                this._value = value;
            }

            get value(): any {
                return this._value;
            }
        }

        @AddValidate([
            {validator: "IsNumber"},
        ],'_parentClassValidate')
        class ParentClass extends ParentPArentClass {
            private _parentClassValidate: any;
            constructor(value: any) {
                super(value);
                this._parentClassValidate = value;
            }
        }

        @AddValidate([
            {validator: "IsInt",},
        ])
        class ChildClass extends ParentClass {

        }

        const parentInstance = new ParentClass('ParentClass');  // Esto debería fallar la validación IsNumber
        const childInstance = new ChildClass('ChildClass');  // Esto debería fallar la validación IsInt

        const parentErrors = await validate(parentInstance);
        const childErrors = await validate(childInstance);

        // Expectations for ParentClass
        expect(parentErrors).toHaveLength(1);
        expect(parentErrors[0].property).toBe('_parentClassValidate');
        expect(parentErrors[0].constraints).toEqual({
            isNumber: '_parentClassValidate must be a number conforming to the specified constraints',
        });

        // Expectations for ChildClass
        expect(childErrors).toHaveLength(2);

        // Validation error for '_value' property
        const valueError = childErrors.find(error => error.property === '_value');
        expect(valueError).toBeDefined();
        expect(valueError?.constraints).toEqual({
            isInt: '_value must be an integer number',
        });

        // Validation error for '_parentClassValidate' property
        const parentClassValidateError = childErrors.find(error => error.property === '_parentClassValidate');
        expect(parentClassValidateError).toBeDefined();
        expect(parentClassValidateError?.constraints).toEqual({
            isNumber: '_parentClassValidate must be a number conforming to the specified constraints',
        });


    });
});
