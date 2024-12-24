import { Module } from '@nestjs/common';
import { AccountManagementControllerController } from './controller/account-management.controller.controller';

@Module({
  controllers: [AccountManagementControllerController],
})
export class FinancialManagementAppModule {}
