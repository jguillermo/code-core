import { expectTypeOf } from 'expect-type';
import { PrimitiveType } from './primitive-type';
import {
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
});
