# **Archi Code**

# types

## boolean

recoment to extend this classess to create a new required or optional type

```
@AddValidate([{ validator: 'IsOptional' }])
export class BooleanTypeOptional extends AbstractBooleanType<null> {
  constructor(value: boolean | null = null) {
    super(value);
  }
}

export class BooleanTypeRequired extends AbstractBooleanType {}
```

## date

```
@AddValidate([{ validator: 'IsOptional' }])
export class DateTypeOptional extends AbstractDateType<null> {
  constructor(value: Date | null = null) {
    super(value);
  }
}

export class DateTypeRequired extends AbstractDateType {}
```

## enum

this is a example how to use enum with the AbstractEnumType

```
enum StatusString {
  UP = 'up',
  DOWN = 'down',
}

@AddValidate([{ validator: 'IsEnum', value: StatusString }])
export class EnumTypeRequired extends AbstractEnumType<StatusString> {}

@AddValidate([{ validator: 'IsEnum', value: StatusString }, { validator: 'IsOptional' }])
export class EnumTypeOptional extends AbstractEnumType<StatusString, null> {}
```

## json

this is a example how to use json with the AbstractJsonType

```
interface JsonValuesTest {
  a: number;
}

@AddValidate([{ validator: 'IsOptional' }])
class JsonTypeOptional extends AbstractJsonType<JsonValuesTest, null> {
  constructor(value: JsonValuesTest | null = null) {
    super(value);
  }
}

class JsonTypeRequired extends AbstractJsonType<JsonValuesTest> {}

```

## number

```
@AddValidate([{ validator: 'IsOptional' }])
export class NumberTypeOptional extends AbstractNumberType<null> {
  constructor(value: number | null = null) {
    super(value);
  }
}

export class NumberTypeRequired extends AbstractNumberType {}
```

## string

```
@AddValidate([{ validator: 'IsOptional' }])
export class StringTypeOptional extends AbstractStringType<null> {
  constructor(value: string | null = null) {
    super(value);
  }
}

export class StringTypeRequire extends AbstractStringType {}
```

## uuid

```
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
```

## id

```
@AddValidate([{ validator: 'IsNotEmpty' }])
export class IdType extends AbstractUuidType {}
```