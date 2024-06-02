import { StringValidator } from '@code-core/domain';

describe('Validator Values', () => {
  it('string', async () => {
    expect(StringValidator.isValid('a')).toEqual(true);
  });
  it('object String', async () => {
    expect(StringValidator.isValid(new String('a'))).toEqual(true);
  });
  it('boolean', async () => {
    expect(StringValidator.isValid(true)).toEqual(false);
    expect(StringValidator.isValid(false)).toEqual(false);
  });
  it('number', async () => {
    expect(StringValidator.isValid(11)).toEqual(false);
    expect(StringValidator.isValid(0)).toEqual(false);
    expect(StringValidator.isValid(-11)).toEqual(false);
    expect(StringValidator.isValid(1.5)).toEqual(false);
    expect(StringValidator.isValid(-1.5)).toEqual(false);
  });
  it('array', async () => {
    expect(StringValidator.isValid(['a'])).toEqual(false);
    expect(StringValidator.isValid([])).toEqual(false);
  });
  it('null', async () => {
    expect(StringValidator.isValid(null)).toEqual(false);
    expect(StringValidator.isValid(undefined)).toEqual(false);
  });
});
