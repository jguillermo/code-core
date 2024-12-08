import { IdType } from '@code-core/domain';
import { CreateFinancialAccountDto } from '../../../../src/application/account-management/create-financial-account/create-financial-account.dto';
import { faker } from '@faker-js/faker';
import { DtoObjectMother } from '@code-core/test';
import { AccountCurrency } from '../../../../src/domain/account/types/account-currency';
import { AccountType } from '../../../../src/domain/account/types/account-type';

export class CreateFinancialAccountObjectMother extends DtoObjectMother<CreateFinancialAccountDto> {
  getPropertiesByLevel(): Record<number, (keyof CreateFinancialAccountDto)[]> {
    return {
      1: ['id', 'name', 'type', 'currency', 'balance'],
      2: ['financialEntity', 'accountNumber'],
      3: ['tags'],
    };
  }

  x;

  getNewDto(): CreateFinancialAccountDto {
    return new CreateFinancialAccountDto();
  }

  getDefaultValues(): Partial<CreateFinancialAccountDto> {
    return {
      id: IdType.random(),
      name: faker.company.name(),
      type: faker.helpers.arrayElement([AccountType.enum().REAL, AccountType.enum().VIRTUAL]),
      currency: faker.helpers.arrayElement([AccountCurrency.enum().USD, AccountCurrency.enum().PEN]),
      balance: faker.number.int({ min: 0, max: 10000 }),
      financialEntity: faker.company.name(),
      accountNumber: faker.string.numeric(10),
      tags: [faker.lorem.word({ length: { min: 2, max: 19 } })],
    };
  }
}
