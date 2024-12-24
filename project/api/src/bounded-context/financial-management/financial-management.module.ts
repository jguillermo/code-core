import { Module } from '@nestjs/common';
import { AccountInMemoryRepository } from './infrastructure/repository/AccountInMemoryRepository';

@Module({
  imports: [],
  providers: [
    AccountInMemoryRepository,
    // ProviderFactory.forClass(CreateFinancialAccount).withDependencies([
    //   AccountInMemoryRepository,
    // ]),
  ],
  exports: [],
})
export class FinancialManagementModule {}
