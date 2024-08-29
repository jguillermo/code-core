import { AbstractBooleanType, AbstractDateType, AbstractEnumType, AbstractNumberType, AbstractStringType, AbstractUuidType, IdType } from '@code-core/domain';

type PrimitiveEnum<T> = T extends string ? string : T extends number ? number : never;

export type PrimitiveType<T> =
  T extends AbstractBooleanType<undefined>
    ? boolean
    : T extends AbstractBooleanType<null>
      ? boolean | null
      : T extends AbstractDateType<undefined>
        ? Date
        : T extends AbstractDateType<null>
          ? Date | null
          : T extends AbstractNumberType<undefined>
            ? number
            : T extends AbstractNumberType<null>
              ? number | null
              : T extends AbstractStringType<undefined>
                ? string
                : T extends AbstractStringType<null>
                  ? string | null
                  : T extends IdType
                    ? string
                    : T extends AbstractUuidType<undefined>
                      ? string
                      : T extends AbstractUuidType<null>
                        ? string | null
                        : T extends AbstractEnumType<infer U>
                          ? PrimitiveEnum<U>
                          : T extends AbstractEnumType<infer U, null>
                            ? PrimitiveEnum<U> | null
                            : never;

// export type PrimitiveType<T> = T extends PrimitiveTypes
//   ? T
//   : T extends { value: infer U }
//     ? PrimitiveType<U>
//     : T extends Array<{ value: infer U }>
//       ? U[]
//       : T extends Array<infer U>
//         ? Array<PrimitiveType<U>>
//         : T extends { [K in keyof Properties<T>]: infer U }
//           ? { [K in keyof Properties<T>]: PrimitiveType<U> }
//           : never;
