import {ValidatorInterface} from "@code-core/domain";


export type ValueTypeNullable<T> = T | null;
export type ValueTypeRequired<T> = T;

export abstract class AbstractType<T> implements ValidatorInterface {
    protected _value: T;

    constructor(value: any = null) {
        this._value = this.filter(value);
    }

    get value(): T {
        return this._value;
    }

    get isNull(): boolean {
        return this._value === null;
    }

    get isNotNull(): boolean {
        return !this.isNull;
    }

    isValid(): boolean {
        return true;
    }

    validatorMessage(): string {
        return 'value ($value) is not valid.';
    }

    abstract get toString(): string;

    protected abstract filter(value: any): any;
}
