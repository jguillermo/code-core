import {AddValidate} from "./type-validator";
import {validate } from 'class-validator';

describe('Validator Number', () => {
    it('number', async () => {

        @AddValidate('name', [
            {min: 15}, {max: 20},{isNumber:true}
        ])
        class User {
            public name: string;

            constructor(name: string) {
                this.name = name;
            }
        }

        const user = new User("John");
        const errors = await validate(user);
        expect(errors.length).toEqual(1);
        expect(errors[0].property).toEqual('name');
        expect(errors[0].constraints.min).toBeDefined();
        expect(errors[0].constraints.max).toBeDefined();

    });
});
