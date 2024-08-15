import { JsonCompare } from './json-commpare';
import { universalToString } from '../utils/string/universal-to-string';

function _(obj1: any, obj2: any, expectValues: string[] = []) {
  const jsonCompare = new JsonCompare(obj1, obj2, false);
  it(`compare: ${universalToString(obj1)} eq ${universalToString(obj2)}`, () => {
    expect(expectValues).toEqual(jsonCompare.differences);
  });
}

describe('JsonCompare', () => {
  describe('primitives', () => {
    describe('equals ', () => {
      _(1, 1);
      _(false, false);
      _('1', '1');
      _('text', 'text');
      _({ a: '1', b: 1 }, { a: '1', b: 1 });
      _({ a: 1, b: 1 }, { a: 1, b: 1 });
      _([1], [1]);
      _([1, 2], [1, 2]);
      _([1, '2'], [1, '2']);
      _([1, '2', true], [1, '2', true]);
    });
    describe('not equals ', () => {
      _(1, 2, [': 2 -> 1']);
      _('text', 'text2', [': "text2" -> "text"']);
    });
  });
});
