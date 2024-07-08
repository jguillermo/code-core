import { classTestSpec } from '../../common/test/util-test';
import { AbstractStringType } from './abstract-string-type';
import { AddValidate } from '../../validator/decorator/type-validator';

class StringTypeRequire extends AbstractStringType {}

@AddValidate([{ validator: 'IsOptional' }])
class StringTypeOptional extends AbstractStringType<null> {}

describe.skip('String Type', () => {
  let type: StringTypeRequire;
  describe('expectValue', () => {
    classTestSpec(StringTypeRequire, {
      value: [
        //valid string value
        ['abc123', 'abc123'],
        ['áéíóú', 'áéíóú'],
        ['', ''],
        //Empty
        [null, null],
        [undefined, null],
        null,
        //boolean
        [true, 'true'],
        [false, 'false'],
        //number
        [1, '1'],
        [0, '0'],
        [-1, '-1'],
        [1.1, '1.1'],
        [0.1, '0.1'],
        [-0.1, '-0.1'],
        [-1.1, '-1.1'],
      ],
      isNull: [
        true,
        [undefined, true],
        [null, true],
        [0, false],
        [0.1, false],
        [1, false],
        [1.1, false],
        [false, false],
        [true, false],
        ['abc', false],
        ['0', false],
        ['', false],
        ['1', false],
      ],
      isEmpty: [
        ['', true],
        true,
        [null, true],
        [undefined, true],
        ['0', false],
        ['false', false],
        ['abc123', false],
        ['áéíóú', false],
        [0, false],
        [0.1, false],
        [1, false],
        [1.1, false],
        [false, false],
        [true, false],
      ],
      toString: [['', ''], '', [null, ''], ['abc123', 'abc123'], ['áéíóú', 'áéíóú'], [0, '0'], [0.1, '0.1'], [1, '1'], [1.1, '1.1'], [false, 'false'], [true, 'true']],
    });
  });
});
