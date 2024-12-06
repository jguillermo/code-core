import { CreateFinancialAccount } from './create-financial-account';
import { CreateFinancialAccountDto } from './create-financial-account.dto';
import { AccountRepository } from '../../../domain/account/account.repository';
import { Account } from '../../../domain/account/account';
import { IdType } from '@code-core/domain';

class MockAccountRepository extends AccountRepository {
  persist = jest.fn();
  findById = jest.fn();
  findAll = jest.fn();
  findLiabilities = jest.fn();
  protected toAggregate = jest.fn();
}

const dtoObjectMother = (params: Partial<CreateFinancialAccountDto>): CreateFinancialAccountDto => {
  const dto = new CreateFinancialAccountDto();
  dto.id = params.id ?? IdType.random();
  dto.name = params.name ?? undefined;
  dto.type = params.type ?? undefined;
  dto.currency = params.currency ?? undefined;
  dto.balance = params.balance ?? undefined;
  dto.financialEntity = params.financialEntity ?? undefined;
  dto.accountNumber = params.accountNumber ?? undefined;
  dto.tags = params.tags ?? undefined;
  dto.levelValidation = params.levelValidation ?? dto.levelValidation;
  return dto;
};

describe('CreateFinancialAccount Use Case', () => {
  let useCase: CreateFinancialAccount;
  const mockAccountRepository = new MockAccountRepository();

  beforeEach(() => {
    useCase = new CreateFinancialAccount(mockAccountRepository as jest.Mocked<AccountRepository>);
  });

  describe('Level 1 - Basic functionality', () => {
    it('should create a valid real account with initial balance', () => {
      const dto: CreateFinancialAccountDto = dtoObjectMother({
        name: 'My Real Account',
        type: 'Real',
        currency: 'USD',
        balance: 1000,
      });

      useCase.execute(dto);

      expect(mockAccountRepository.persist).toHaveBeenCalled();
      const persistedAccount = mockAccountRepository.persist.mock.calls[0][0] as Account;

      expect(persistedAccount.toJson()).toMatchObject({
        name: dto.name,
        type: dto.type,
        currency: dto.currency,
        balance: dto.balance,
      });
    });

    // it('should throw an error if initial balance is missing for a real account', () => {
    //   const dto: CreateFinancialAccountDto = {
    //     name: 'My Real Account',
    //     type: 'Real',
    //     currency: 'USD',
    //   };
    //
    //   expect(() => useCase.execute(dto, 1)).toThrowError('Initial balance is required for real accounts at level 1.');
    // });
    //
    // it('should create a virtual account without balance', () => {
    //   const dto: CreateFinancialAccountDto = {
    //     name: 'My Virtual Account',
    //     type: 'Virtual',
    //     currency: 'USD',
    //   };
    //
    //   useCase.execute(dto, 1);
    //
    //   expect(mockAccountRepository.persist).toHaveBeenCalled();
    //   const persistedAccount = mockAccountRepository.persist.mock.calls[0][0] as Account;
    //
    //   expect(persistedAccount.toJson()).toMatchObject({
    //     name: dto.name,
    //     type: dto.type,
    //     currency: dto.currency,
    //     balance: 0,
    //   });
    // });
    //
    // it('should throw an error if name is too short', () => {
    //   const dto: CreateFinancialAccountDto = {
    //     name: 'A',
    //     type: 'Virtual',
    //     currency: 'USD',
    //   };
    //
    //   expect(() => useCase.execute(dto, 1)).toThrowError();
    // });
  });

  // describe('Level 2 - Intermediate functionality', () => {
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
  //     expect(mockAccountRepository.persist).toHaveBeenCalled();
  //     const persistedAccount = mockAccountRepository.persist.mock.calls[0][0] as Account;
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
  //     expect(() => useCase.execute(dto, 2)).toThrowError('Financial entity and account number are required at level 2 for real accounts.');
  //   });
  // });
  //
  // describe('Level 3 - Advanced functionality', () => {
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
  //     expect(mockAccountRepository.persist).toHaveBeenCalled();
  //     const persistedAccount = mockAccountRepository.persist.mock.calls[0][0] as Account;
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
  //     expect(() => useCase.execute(dto, 3)).toThrowError();
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
  //     expect(() => useCase.execute(dto, 1)).toThrowError();
  //   });
  //
  //   it('should throw an error if type is invalid', () => {
  //     const dto: any = {
  //       name: 'Invalid Type Account',
  //       type: 'Invalid',
  //       currency: 'USD',
  //     };
  //
  //     expect(() => useCase.execute(dto, 1)).toThrowError();
  //   });
  // });
});
