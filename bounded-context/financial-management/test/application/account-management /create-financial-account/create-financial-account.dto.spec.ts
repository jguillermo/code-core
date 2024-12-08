import { CreateFinancialAccountObjectMother } from './create-financial-account.object-mother';
import { CreateFinancialAccountDto } from '../../../../src/application/account-management/create-financial-account/create-financial-account.dto';

describe('CreateFinancialAccountObjectMother', () => {
  it('should create a DTO with default values for level 1', () => {
    const dto = CreateFinancialAccountObjectMother.create(1);

    expect(dto).toBeInstanceOf(CreateFinancialAccountDto);
    expect(dto.id).toBeDefined();
    expect(dto.name).toBeDefined();
    expect(dto.type).toBeDefined();
    expect(dto.currency).toBeDefined();
    expect(dto.balance).toBeDefined();
    expect(dto.financialEntity).toBeUndefined();
    expect(dto.accountNumber).toBeUndefined();
    expect(dto.tags).toBeUndefined();
  });

  it('should include level 2 properties when level is 2', () => {
    const dto = CreateFinancialAccountObjectMother.create(2);

    expect(dto).toBeInstanceOf(CreateFinancialAccountDto);
    expect(dto.financialEntity).toBeDefined();
    expect(dto.accountNumber).toBeDefined();
    expect(dto.tags).toBeUndefined();
  });

  it('should include level 3 properties when level is 3', () => {
    const dto = CreateFinancialAccountObjectMother.create(3);

    expect(dto).toBeInstanceOf(CreateFinancialAccountDto);
    expect(dto.tags).toBeDefined();
  });

  it('should override default values with provided values', () => {
    const customName = 'Custom Account Name';
    const customBalance = 5000;
    const dto = CreateFinancialAccountObjectMother.create(1, {
      name: customName,
      balance: customBalance,
    });

    expect(dto.name).toBe(customName);
    expect(dto.balance).toBe(customBalance);
  });

  it('should exclude specified properties', () => {
    const dto = CreateFinancialAccountObjectMother.create(1, {}, ['name', 'balance']);

    expect(dto.name).toBeUndefined();
    expect(dto.balance).toBeUndefined();
    expect(dto.currency).toBeDefined();
  });

  it('should handle level 2 overrides correctly', () => {
    const customFinancialEntity = 'Custom Bank';
    const dto = CreateFinancialAccountObjectMother.create(2, {
      financialEntity: customFinancialEntity,
    });

    expect(dto.financialEntity).toBe(customFinancialEntity);
    expect(dto.accountNumber).toBeDefined();
  });

  it('should handle level 3 overrides and exclusions', () => {
    const customTag = ['Important'];
    const dto = CreateFinancialAccountObjectMother.create(3, { tags: customTag }, ['balance']);

    expect(dto.tags).toEqual(customTag);
    expect(dto.balance).toBeUndefined();
  });

  it('should generate a unique ID by default', () => {
    const dto1 = CreateFinancialAccountObjectMother.create(1);
    const dto2 = CreateFinancialAccountObjectMother.create(1);

    expect(dto1.id).not.toBe(dto2.id);
  });
});
