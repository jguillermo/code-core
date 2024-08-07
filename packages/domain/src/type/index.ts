import { AddValidate } from '../validator/decorator/type-validator';
import { AbstractUuidType } from './uuid/abstract-uuid-type';

export { AbstractBooleanType } from './boolean/abstract-boolean-type';
export { AbstractStringType } from './string/abstract-string-type';
export { AbstractDateType } from './date/abstract-date-type';
export { AbstractEnumType } from './enum/abstract-enum-type';
// export * from './id';
export { AbstractNumberType } from './number/abstract-number-type';
export { AbstractUuidType } from './uuid/abstract-uuid-type';
export * from './array';

@AddValidate([{ validator: 'IsOptional' }])
export class UuidTypeOptional extends AbstractUuidType<null> {
  constructor(value: string | null = null) {
    super(value);
  }
}

@AddValidate([{ validator: 'IsNotEmpty' }])
export class UuidTypeRequired extends AbstractUuidType {}

@AddValidate([{ validator: 'IsNotEmpty' }])
export class IdType extends AbstractUuidType {}
