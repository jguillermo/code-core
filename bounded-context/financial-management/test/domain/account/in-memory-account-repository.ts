import { AccountRepository } from '../../../src/domain/account/account.repository';
import { InMemoryRepository } from '@code-core/test';
import { PrimitiveTypes } from '@code-core/domain';
import { AccountTypes } from '../../../src/domain/account/account.types';
import { Account } from '../../../src/domain/account/account';

export class InMemoryAccountRepository extends AccountRepository {
  private db = new InMemoryRepository<PrimitiveTypes<AccountTypes>>();

  async findAll(): Promise<Account[]> {
    const rs = await this.db.findAll();
    return rs.map((r) => this.toAggregate(r));
  }

  async findById(accountId: string): Promise<Account | null> {
    const rs = await this.db.findById(accountId);
    return rs ? this.toAggregate(rs) : null;
  }

  async findLiabilities(): Promise<Account[]> {
    const rs = await this.db.findAll();
    return rs.map((a) => this.toAggregate(a));
  }

  async persist(account: Account): Promise<void> {
    await this.db.persist(account.toJson());
  }
}
