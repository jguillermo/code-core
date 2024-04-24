import 'reflect-metadata';
import { Min, Max, validate } from 'class-validator';

type Validator = {
    min?: number;
    max?: number;
};

export function AddValidate(propertyKey: string, validators: Validator[]) {
    return function (constructor: Function) {
        validators.forEach(validator => {
            if (validator.min !== undefined) {
                Min(validator.min)(constructor.prototype, propertyKey);
            }
            if (validator.max !== undefined) {
                Max(validator.max)(constructor.prototype, propertyKey);
            }
        });
    }
}
