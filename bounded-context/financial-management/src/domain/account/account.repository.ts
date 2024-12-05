import { Account } from './account';
import { PrimitiveTypes } from '@code-core/domain';
import { AccountTypes } from './account.types';

export abstract class AccountRepository {
  abstract findById(accountId: string): Account | null;

  abstract persist(account: Account): void;

  abstract findAll(): Account[];

  abstract findLiabilities(): Account[]; // Para reportes financieros

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
