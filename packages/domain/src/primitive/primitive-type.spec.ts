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
  StringTypeRequired,
  UuidTypeOptional,
  UuidTypeRequired,
} from '@code-core/domain';
import { AddValidate } from '../validator/decorator/type-validator';
import { AbstractJsonType } from '../type/abstract-json-type';

describe('Primitive Types', () => {
  it('booleanType', () => {
    expectTypeOf<PrimitiveType<BooleanTypeRequired>>().toEqualTypeOf<boolean>();
    expectTypeOf<PrimitiveType<BooleanTypeOptional>>().toEqualTypeOf<boolean | null>();

    expectTypeOf<PrimitiveType<BooleanTypeRequired[]>>().toEqualTypeOf<boolean[]>();
    expectTypeOf<PrimitiveType<BooleanTypeOptional[]>>().toEqualTypeOf<Array<boolean | null>>();
  });
  it('dateType', () => {
    expectTypeOf<PrimitiveType<DateTypeRequired>>().toEqualTypeOf<Date>();
    expectTypeOf<PrimitiveType<DateTypeOptional>>().toEqualTypeOf<Date | null>();

    expectTypeOf<PrimitiveType<DateTypeRequired[]>>().toEqualTypeOf<Date[]>();
    expectTypeOf<PrimitiveType<DateTypeOptional[]>>().toEqualTypeOf<Array<Date | null>>();
  });
  it('numberType', () => {
    expectTypeOf<PrimitiveType<NumberTypeRequired>>().toEqualTypeOf<number>();
    expectTypeOf<PrimitiveType<NumberTypeOptional>>().toEqualTypeOf<number | null>();

    expectTypeOf<PrimitiveType<NumberTypeRequired[]>>().toEqualTypeOf<number[]>();
    expectTypeOf<PrimitiveType<NumberTypeOptional[]>>().toEqualTypeOf<Array<number | null>>();
  });
  it('stringType', () => {
    expectTypeOf<PrimitiveType<StringTypeRequired>>().toEqualTypeOf<string>();
    expectTypeOf<PrimitiveType<StringTypeOptional>>().toEqualTypeOf<string | null>();

    expectTypeOf<PrimitiveType<StringTypeRequired[]>>().toEqualTypeOf<string[]>();
    expectTypeOf<PrimitiveType<StringTypeOptional[]>>().toEqualTypeOf<Array<string | null>>();
  });
  it('uuidType', () => {
    expectTypeOf<PrimitiveType<UuidTypeRequired>>().toEqualTypeOf<string>();
    expectTypeOf<PrimitiveType<UuidTypeOptional>>().toEqualTypeOf<string | null>();

    expectTypeOf<PrimitiveType<UuidTypeRequired[]>>().toEqualTypeOf<string[]>();
    expectTypeOf<PrimitiveType<UuidTypeOptional[]>>().toEqualTypeOf<Array<string | null>>();
  });
  it('idType', () => {
    expectTypeOf<PrimitiveType<IdType>>().toEqualTypeOf<string>();

    expectTypeOf<PrimitiveType<IdType[]>>().toEqualTypeOf<string[]>();
  });
  it('enum string', () => {
    enum StatusString {
      UP = 'up',
      DOWN = 'down',
    }

    @AddValidate([{ validator: 'IsEnum', value: StatusString }, { validator: 'IsNotEmpty' }])
    class EnumTypeRequired extends AbstractEnumType<StatusString> {
      protected getEnum(): Record<string, StatusString> {
        return StatusString;
      }
    }

    @AddValidate([{ validator: 'IsEnum', value: StatusString }, { validator: 'IsOptional' }])
    class EnumTypeOptional extends AbstractEnumType<StatusString, null> {
      protected getEnum(): Record<string, StatusString> {
        return StatusString;
      }
    }

    expectTypeOf<PrimitiveType<EnumTypeRequired>>().toEqualTypeOf<string>();
    //todo, queda pendiente mostar el tipo corectamente, cuando sea enum optional
    // al parecer hay un bug en typescrit, cuando quitamos protected getEnum(): funciona bien
    // expectTypeOf<PrimitiveType<EnumTypeOptional>>().toEqualTypeOf<string | null>();

    expectTypeOf<PrimitiveType<EnumTypeRequired[]>>().toEqualTypeOf<string[]>();
    // expectTypeOf<PrimitiveType<EnumTypeOptional[]>>().toEqualTypeOf<Array<string | null>>();
  });

  it('enum number', () => {
    enum StatusNumber {
      UP = 1,
      DOWN = 2,
    }

    @AddValidate([{ validator: 'IsEnum', value: StatusNumber }, { validator: 'IsNotEmpty' }])
    class EnumTypeRequired extends AbstractEnumType<StatusNumber> {
      protected getEnum(): any {
        return StatusNumber;
      }
    }

    @AddValidate([{ validator: 'IsEnum', value: StatusNumber }, { validator: 'IsOptional' }])
    class EnumTypeOptional extends AbstractEnumType<StatusNumber, null> {
      protected getEnum(): any {
        return StatusNumber;
      }
    }

    expectTypeOf<PrimitiveType<EnumTypeRequired>>().toEqualTypeOf<number>();
    // expectTypeOf<PrimitiveType<EnumTypeOptional>>().toEqualTypeOf<number | null>();

    expectTypeOf<PrimitiveType<EnumTypeRequired[]>>().toEqualTypeOf<number[]>();
    // expectTypeOf<PrimitiveType<EnumTypeOptional[]>>().toEqualTypeOf<Array<number | null>>();
  });

  it('object', () => {
    interface JsonValuesTest {
      a: number;
    }

    @AddValidate([{ validator: 'IsOptional' }])
    class JsonTypeOptional extends AbstractJsonType<JsonValuesTest, null> {
      constructor(value: JsonValuesTest | null = null) {
        super(value);
      }
    }

    @AddValidate([{ validator: 'IsNotEmpty' }])
    class JsonTypeRequired extends AbstractJsonType<JsonValuesTest> {}

    expectTypeOf<PrimitiveType<JsonTypeRequired>>().toEqualTypeOf<object>();
    expectTypeOf<PrimitiveType<JsonTypeOptional>>().toEqualTypeOf<object | null>();

    expectTypeOf<PrimitiveType<JsonTypeRequired[]>>().toEqualTypeOf<object[]>();
    expectTypeOf<PrimitiveType<JsonTypeOptional[]>>().toEqualTypeOf<Array<object | null>>();
  });
});
