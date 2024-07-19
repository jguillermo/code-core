import { testValidation } from '../common/test/util-test';
import { BooleanValidator } from './boolean.validator';
import { canByType, PrimitivesKeys, skipByType } from '../common/test/values-test';

describe('BooleanValidator', () => {
  describe('canBeBoolean', () => {
    testValidation({
      validator: BooleanValidator.canBeBoolean,
      valid: canByType(PrimitivesKeys.BOOLEAN),
      invalid: [...skipByType(PrimitivesKeys.BOOLEAN), {}],
    });
  });
});
