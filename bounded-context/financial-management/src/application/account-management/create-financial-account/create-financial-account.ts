import { AccountRepository } from '../../../domain/account/account.repository';
import { AccountTypes } from '../../../domain/account/account.types';
import { CreateFinancialAccountDto } from './create-financial-account.dto';
import { Account } from '../../../domain/account/account';

export class CreateFinancialAccount {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(dto: CreateFinancialAccountDto): Promise<void> {
    const data = new AccountTypes(dto.levelValidation, dto);

    const account = Account.create(data);

    await this.accountRepository.persist(account);
  }
}
