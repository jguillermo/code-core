import { Injectable } from '@nestjs/common';
import { AccountId } from '@bounded-context/financial-management/dist/domain/account/types/account-id';
import { IdType } from '@code-core/domain';

@Injectable()
export class AccountInMemoryRepository {
  async findAll() {
    return new AccountId(AccountId.random());
  }

  async findAll2() {
    return new IdType(IdType.random());
  }
}
