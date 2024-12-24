import { Injectable } from '@nestjs/common';
import { AccountId } from '@bounded-context/financial-management/dist/domain/account/types/account-id';

@Injectable()
export class AccountInMemoryRepository {
  async findAll() {
    return new AccountId(AccountId.random());
  }
}
