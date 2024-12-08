import { CreateFinancialAccountDto } from '../../../../src/application/account-management/create-financial-account/create-financial-account.dto';
import { CreateFinancialAccount } from '../../../../src/application/account-management/create-financial-account/create-financial-account';
import { InMemoryAccountRepository } from '../../../domain/account/in-memory-account-repository';
import { JsonCompare } from '@code-core/test';
import { CreateFinancialAccountObjectMother as dtoObjectMother } from './create-financial-account.object-mother';
import { validate } from 'class-validator';
import { AccountType } from '../../../../src/domain/account/types/account-type';

describe('CreateFinancialAccount Use Case', () => {
  let useCase: CreateFinancialAccount;
  let accountRepository: InMemoryAccountRepository;

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    useCase = new CreateFinancialAccount(accountRepository);
  });

  describe('Level 1 - Basic functionality', () => {
    it('should create a valid dto level 1', async () => {
      const dto = dtoObjectMother.create(1);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      await useCase.execute(dto);
      const persistedAccount = await accountRepository.findById(dto.id ?? '');
      expect(JsonCompare.include({ id: dto.id }, persistedAccount?.toJson())).toEqual([]);
    });

    it('should throw an error if initial balance is missing for a real account, with validation', async () => {
      expect(async () => {
        const dto = dtoObjectMother.create(1, { type: AccountType.enum().REAL }, ['balance']);
        const errors = await validate(dto);
        expect(errors.length).toBe(1);
        await useCase.execute(dto);
      }).rejects.toThrow('AccountBalance: must be a number, should not be empty');
    });

    it('should throw an error if initial balance is missing for a real account', async () => {
      expect(async () => {
        const dto = dtoObjectMother.create(1, { type: AccountType.enum().REAL }, ['balance']);
        await useCase.execute(dto);
      }).rejects.toThrow('AccountBalance: must be a number, should not be empty');
    });

    it('should create a virtual account without balance', async () => {
      const dto = dtoObjectMother.create(1, { type: AccountType.enum().VIRTUAL });
      await useCase.execute(dto);

      const persistedAccount = await accountRepository.findById(dto.id ?? '');
      expect(JsonCompare.include({ id: dto.id, balance: 0 }, persistedAccount?.toJson())).toEqual([]);
    });

    it('should throw an error if name is too short', () => {
      const dto = dtoObjectMother.create(1, { name: 'A' });
      expect(() => useCase.execute(dto)).rejects.toThrow();
    });
  });

  describe('Level 2 - Intermediate functionality', () => {
    it('should create a valid dto level 2', async () => {
      const dto: CreateFinancialAccountDto = dtoObjectMother.create(2);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      await useCase.execute(dto);
      const persistedAccount = await accountRepository.findById(dto.id ?? '');
      expect(JsonCompare.include({ id: dto.id }, persistedAccount?.toJson())).toEqual([]);
    });
    //   it('should create a real account with financial details', () => {
    //     const dto: CreateFinancialAccountDto = {
    //       name: 'Real Account with Details',
    //       type: 'Real',
    //       currency: 'USD',
    //       balance: 500,
    //       financialEntity: 'Bank X',
    //       accountNumber: '123456',
    //     };
    //
    //     useCase.execute(dto, 2);
    //
    //     expect(accountRepository.persist).toHaveBeenCalled();
    //     const persistedAccount = accountRepository.persist.mock.calls[0][0] as Account;
    //
    //     expect(persistedAccount.toJson()).toMatchObject({
    //       name: dto.name,
    //       type: dto.type,
    //       currency: dto.currency,
    //       balance: dto.balance,
    //       financialEntity: dto.financialEntity,
    //       number: dto.accountNumber,
    //     });
    //   });
    //
    //   it('should throw an error if financial details are missing at level 2', () => {
    //     const dto: CreateFinancialAccountDto = {
    //       name: 'Real Account with Missing Details',
    //       type: 'Real',
    //       currency: 'USD',
    //       balance: 1000,
    //     };
    //
    //     expect(() => useCase.execute(dto, 2)).toThrow('Financial entity and account number are required at level 2 for real accounts.');
    //   });
  });
  //
  describe('Level 3 - Advanced functionality', () => {
    it('should create a valid dto level 2', async () => {
      const dto: CreateFinancialAccountDto = dtoObjectMother.create(3);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      await useCase.execute(dto);
      const persistedAccount = await accountRepository.findById(dto.id ?? '');
      expect(JsonCompare.include({ id: dto.id }, persistedAccount?.toJson())).toEqual([]);
    });
    //   it('should create an account with tags', () => {
    //     const dto: CreateFinancialAccountDto = {
    //       name: 'Tagged Account',
    //       type: 'Virtual',
    //       currency: 'EUR',
    //       tags: ['Project A', 'Marketing'],
    //     };
    //
    //     useCase.execute(dto, 3);
    //
    //     expect(accountRepository.persist).toHaveBeenCalled();
    //     const persistedAccount = accountRepository.persist.mock.calls[0][0] as Account;
    //
    //     expect(persistedAccount.toJson()).toMatchObject({
    //       name: dto.name,
    //       type: dto.type,
    //       currency: dto.currency,
    //       balance: 0,
    //       tags: ['Project A', 'Marketing'],
    //     });
    //   });
    //
    //   it('should throw an error if tags are not an array', () => {
    //     const dto: any = {
    //       name: 'Invalid Tags Account',
    //       type: 'Virtual',
    //       currency: 'USD',
    //       tags: 'InvalidTag',
    //     };
    //
    //     expect(() => useCase.execute(dto, 3)).toThrow();
    //   });
    // });
    //
    // describe('Common validation errors', () => {
    //   it('should throw an error if currency is not provided', () => {
    //     const dto: any = {
    //       name: 'No Currency Account',
    //       type: 'Real',
    //     };
    //
    //     expect(() => useCase.execute(dto, 1)).toThrow();
    //   });
    //
    //   it('should throw an error if type is invalid', () => {
    //     const dto: any = {
    //       name: 'Invalid Type Account',
    //       type: 'Invalid',
    //       currency: 'USD',
    //     };
    //
    //     expect(() => useCase.execute(dto, 1)).toThrow();
    //   });
  });
});
