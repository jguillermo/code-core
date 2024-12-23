import { Module } from '@nestjs/common';
import { AccountRepository } from '@bounded-context/financial-management/src/domain/account/account.repository';
import { AccountInMemoryRepository } from './infrastructure/repository/AccountInMemoryRepository';
import { CreateFinancialAccount } from '@bounded-context/financial-management/src/application/account-management/create-financial-account/create-financial-account';
import { ProviderFactory } from '../shared/providers/provider.factory';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: AccountRepository,
      useClass: AccountInMemoryRepository,
    },
    ProviderFactory.forClass(CreateFinancialAccount).withDependencies([
      AccountRepository,
    ]),
  ],
  exports: [CreateFinancialAccount],
})
export class FinancialManagementModule {}
