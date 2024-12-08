import { CreatedAt, PrimitiveTypes } from '@code-core/domain';
import { AccountTypes } from '../../src/domain/account/account.types';
import { Account } from '../../src/domain/account/account';
import { AccountId } from '../../src/domain/account/types/account-id';
import { AccountName } from '../../src/domain/account/types/account-name';
import { AccountType } from '../../src/domain/account/types/account-type';
import { AccountCurrency } from '../../src/domain/account/types/account-currency';
import { AccountBalance } from '../../src/domain/account/types/account-balance';
import { AccountFinancialEntity } from '../../src/domain/account/types/account-financial-entity';
import { AccountNumber } from '../../src/domain/account/types/account-number';
import { AccountListTag } from '../../src/domain/account/types/account-list-tag';

export const AccountObjectMother = (params?: Partial<PrimitiveTypes<AccountTypes>>): Account => {
  return new Account(
    new AccountId(params?.id ?? AccountId.random()),
    new AccountName(params?.name ?? 'Account A'),
    new AccountType((params?.type as any) ?? AccountType.enum().REAL),
    new AccountCurrency((params?.currency as any) ?? AccountCurrency.enum().USD),
    new AccountBalance(params?.balance ?? 1000),
    new AccountFinancialEntity(params?.financialEntity ?? 'Bank A'),
    new AccountNumber(params?.number ?? '123456'),
    new AccountListTag(params?.tags ?? ['saving', 'personal']),
    new CreatedAt(params?.creationDate ?? new Date()),
  );
};
