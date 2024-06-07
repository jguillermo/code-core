import {AddValidate} from "./type-validator";
import {validate} from 'class-validator';

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
