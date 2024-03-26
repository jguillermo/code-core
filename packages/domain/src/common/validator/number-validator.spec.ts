import {NumberValidator} from "@code-core/domain";


describe('Validator Number', () => {
  it('number', async () => {
    expect(NumberValidator.isValid(1)).toEqual(true);
    expect(NumberValidator.isValid(1.5)).toEqual(true);
    expect(NumberValidator.isValid(-1.5)).toEqual(true);
    expect(NumberValidator.isValid(0)).toEqual(true);
  });
  it('object String', async () => {
    expect(NumberValidator.isValid(Number(1))).toEqual(true);
    expect(NumberValidator.isValid(Number(1.5))).toEqual(true);
    expect(NumberValidator.isValid(Number(-1.5))).toEqual(true);
    expect(NumberValidator.isValid(Number(0))).toEqual(true);
  });
  it('boolean', async () => {
    expect(NumberValidator.isValid(true)).toEqual(false);
    expect(NumberValidator.isValid(false)).toEqual(false);
  });
  it('string', async () => {
    expect(NumberValidator.isValid('a')).toEqual(false);
  });
  it('array', async () => {
    expect(NumberValidator.isValid(['a'])).toEqual(false);
    expect(NumberValidator.isValid([1, 2.3])).toEqual(false);
    expect(NumberValidator.isValid([])).toEqual(false);
  });
  it('null', async () => {
    expect(NumberValidator.isValid(null)).toEqual(false);
    expect(NumberValidator.isValid(undefined)).toEqual(false);
  });
});
