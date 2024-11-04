import { Account } from './account';

export abstract class AccountRepository {
  abstract findById(accountId: string): Account | null;

  abstract persist(account: Account): void;

  abstract findAll(): Account[];

  abstract findLiabilities(): Account[]; // Para reportes financieros
}
