import { AddValidate } from '../validator/decorator/type-validator';
import { AbstractBooleanType } from './abstract-boolean-type';
import { AbstractDateType } from './abstract-date-type';
import { AbstractNumberType } from './abstract-number-type';
import { AbstractStringType } from './abstract-string-type';
import { AbstractUuidType } from './abstract-uuid-type';

export { AbstractBooleanType } from './abstract-boolean-type';
export { AbstractStringType } from './abstract-string-type';
export { AbstractDateType } from './abstract-date-type';
export { AbstractEnumType } from './abstract-enum-type';
export { AbstractNumberType } from './abstract-number-type';
export { AbstractUuidType } from './abstract-uuid-type';
export { AddValidate } from '../validator/decorator/type-validator';

//AbstractBooleanType
@AddValidate([{ validator: 'IsOptional' }])
export class BooleanTypeOptional extends AbstractBooleanType<null> {
  constructor(value: boolean | null = null) {
    super(value);
  }
}

@AddValidate([{ validator: 'IsNotEmpty' }])
export class BooleanTypeRequired extends AbstractBooleanType {}

//AbstractDateType

@AddValidate([{ validator: 'IsOptional' }])
export class DateTypeOptional extends AbstractDateType<null> {
  constructor(value: Date | null = null) {
    super(value);
  }
}

@AddValidate([{ validator: 'IsNotEmpty' }])
export class DateTypeRequired extends AbstractDateType {}

//AbstractUuidType

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

//AbstractNumberType
@AddValidate([{ validator: 'IsOptional' }])
export class NumberTypeOptional extends AbstractNumberType<null> {
  constructor(value: number | null = null) {
    super(value);
  }
}

@AddValidate([{ validator: 'IsNotEmpty' }])
export class NumberTypeRequired extends AbstractNumberType {}

//AbstractStringType
@AddValidate([{ validator: 'IsOptional' }])
export class StringTypeOptional extends AbstractStringType<null> {
  constructor(value: string | null = null) {
    super(value);
  }
}

@AddValidate([{ validator: 'IsNotEmpty' }])
export class StringTypeRequired extends AbstractStringType {}
