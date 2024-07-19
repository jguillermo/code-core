export enum PrimitivesKeys {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
  FUNCTION = 'function',
  UNDEFINED = 'undefined',
  NULL = 'null',
  SYMBOL = 'symbol',
  DATE = 'date',
  REGEXP = 'regexp',
  ERROR = 'error',
  PROMISE = 'promise',
  MAP = 'map',
  SET = 'set',
}

const PrimitivesValues = {
  [PrimitivesKeys.STRING]: ['random', '', '   '],
  [PrimitivesKeys.NUMBER]: [1, -1, 1.1, -1.1, 0],
  [PrimitivesKeys.BOOLEAN]: [true, false],
  [PrimitivesKeys.OBJECT]: [{}, { value: 123 }],
  [PrimitivesKeys.ARRAY]: [[], [1, 2, 3]],
  [PrimitivesKeys.FUNCTION]: [() => 123, new Function('return 123')],
  [PrimitivesKeys.UNDEFINED]: [undefined],
  [PrimitivesKeys.NULL]: [null],
  [PrimitivesKeys.SYMBOL]: [Symbol(), Symbol('123')],
  [PrimitivesKeys.DATE]: [new Date(), new Date('2020-01-01')],
  [PrimitivesKeys.REGEXP]: [new RegExp('test'), /test/],
  [PrimitivesKeys.ERROR]: [new Error('data error')],
  [PrimitivesKeys.PROMISE]: [Promise.resolve('data promise')],
  [PrimitivesKeys.MAP]: [new Map(), new Map([[1, 2]])],
  [PrimitivesKeys.SET]: [new Set(), new Set([1, 2, 3])],
};

export function canByType(...primitiveTypes: PrimitivesKeys[]) {
  const values: any[] = [];

  for (const primitiveType of primitiveTypes) {
    switch (primitiveType) {
      case PrimitivesKeys.STRING:
        values.push(...PrimitivesValues[PrimitivesKeys.STRING]);
        values.push(...PrimitivesValues[PrimitivesKeys.NUMBER].map((value) => value.toString()));
        values.push(...PrimitivesValues[PrimitivesKeys.BOOLEAN].map((value) => value.toString()));
        break;
      case PrimitivesKeys.NUMBER:
        values.push(...PrimitivesValues[PrimitivesKeys.NUMBER]);
        values.push(...PrimitivesValues[PrimitivesKeys.NUMBER].map((value) => value.toString()));
        break;
      case PrimitivesKeys.BOOLEAN:
        values.push(...PrimitivesValues[PrimitivesKeys.BOOLEAN]);
        values.push(...PrimitivesValues[PrimitivesKeys.BOOLEAN].map((value) => value.toString()));
        break;
      default:
        values.push(...PrimitivesValues[primitiveType]);
    }
  }

  return values;
}

export function skipByType(...primitiveType: PrimitivesKeys[]) {
  const values: any[] = [];
  for (const key in PrimitivesValues) {
    if (!primitiveType.includes(key as PrimitivesKeys)) {
      values.push(...PrimitivesValues[key]);
    }
  }
  return values;
}
