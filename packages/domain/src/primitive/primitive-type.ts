import { AbstractBooleanType, AbstractDateType, AbstractNumberType, AbstractStringType, AbstractUuidType, IdType } from '@code-core/domain'; // export type PrimitiveTypes = boolean | Date | number | string | undefined | null;

// export type PrimitiveTypes = boolean | Date | number | string | undefined | null;

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
