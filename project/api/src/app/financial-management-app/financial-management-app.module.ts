import { Module } from '@nestjs/common';
import { FinancialManagementModule } from '../../bounded-context/financial-management/financial-management.module';
import { AccountManagementController } from './controller/account-management.controller';

@Module({
  imports: [FinancialManagementModule],
  controllers: [AccountManagementController],
})
export class FinancialManagementAppModule {}
