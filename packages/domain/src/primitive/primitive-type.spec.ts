import { expectTypeOf } from 'expect-type';
import { PrimitiveType } from './primitive-type';
import {
  AbstractEnumType,
  BooleanTypeOptional,
  BooleanTypeRequired,
  DateTypeOptional,
  DateTypeRequired,
  IdType,
  NumberTypeOptional,
  NumberTypeRequired,
  StringTypeOptional,
  StringTypeRequire,
  UuidTypeOptional,
  UuidTypeRequired,
} from '@code-core/domain';
import { AddValidate } from '../validator/decorator/type-validator';

describe('Primitive Types', () => {
  it('booleanType', () => {
    expectTypeOf<PrimitiveType<BooleanTypeRequired>>().toEqualTypeOf<boolean>();
    expectTypeOf<PrimitiveType<BooleanTypeOptional>>().toEqualTypeOf<boolean | null>();
  });
  it('dateType', () => {
    expectTypeOf<PrimitiveType<DateTypeRequired>>().toEqualTypeOf<Date>();
    expectTypeOf<PrimitiveType<DateTypeOptional>>().toEqualTypeOf<Date | null>();
  });
  it('numberType', () => {
    expectTypeOf<PrimitiveType<NumberTypeRequired>>().toEqualTypeOf<number>();
    expectTypeOf<PrimitiveType<NumberTypeOptional>>().toEqualTypeOf<number | null>();
  });
  it('stringType', () => {
    expectTypeOf<PrimitiveType<StringTypeRequire>>().toEqualTypeOf<string>();
    expectTypeOf<PrimitiveType<StringTypeOptional>>().toEqualTypeOf<string | null>();
  });
  it('uuidType', () => {
    expectTypeOf<PrimitiveType<UuidTypeRequired>>().toEqualTypeOf<string>();
    expectTypeOf<PrimitiveType<UuidTypeOptional>>().toEqualTypeOf<string | null>();
  });
  it('idType', () => {
    expectTypeOf<PrimitiveType<IdType>>().toEqualTypeOf<string>();
  });
  it('enum string', () => {
    enum StatusString {
      UP = 'up',
      DOWN = 'down',
    }

    @AddValidate([{ validator: 'IsEnum', value: StatusString }, { validator: 'IsNotEmpty' }])
    class EnumTypeRequired extends AbstractEnumType<StatusString> {}

    @AddValidate([{ validator: 'IsEnum', value: StatusString }, { validator: 'IsOptional' }])
    class EnumTypeOptional extends AbstractEnumType<StatusString, null> {}

    expectTypeOf<PrimitiveType<EnumTypeRequired>>().toEqualTypeOf<string>();
    expectTypeOf<PrimitiveType<EnumTypeOptional>>().toEqualTypeOf<string | null>();
  });

  it('enum number', () => {
    enum StatusNumber {
      UP = 1,
      DOWN = 2,
    }

    @AddValidate([{ validator: 'IsEnum', value: StatusNumber }, { validator: 'IsNotEmpty' }])
    class EnumTypeRequired extends AbstractEnumType<StatusNumber> {}

    @AddValidate([{ validator: 'IsEnum', value: StatusNumber }, { validator: 'IsOptional' }])
    class EnumTypeOptional extends AbstractEnumType<StatusNumber, null> {}

    expectTypeOf<PrimitiveType<EnumTypeRequired>>().toEqualTypeOf<number>();
    expectTypeOf<PrimitiveType<EnumTypeOptional>>().toEqualTypeOf<number | null>();
  });
});
