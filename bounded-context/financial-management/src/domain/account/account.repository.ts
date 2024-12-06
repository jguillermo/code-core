import { Account } from './account';
import { PrimitiveTypes } from '@code-core/domain';
import { AccountTypes } from './account.types';

export abstract class AccountRepository {
  abstract findById(accountId: string): Promise<Account | null>;

  abstract persist(account: Account): Promise<void>;

  abstract findAll(): Promise<Account[]>;

  abstract findLiabilities(): Promise<Account[]>; // Para reportes financieros

  protected toAggregate(data: PrimitiveTypes<AccountTypes>): Account {
    const dataTypes = new AccountTypes(1, data);
    return new Account(
      dataTypes.id,
      dataTypes.name,
      dataTypes.type,
      dataTypes.currency,
      dataTypes.balance,
      dataTypes.financialEntity,
      dataTypes.number,
      dataTypes.tags,
      dataTypes.creationDate,
    );
  }
}
