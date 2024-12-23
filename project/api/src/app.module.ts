import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialManagementAppModule } from './app/financial-management-app/financial-management-app.module';
import { SharedModule } from './bounded-context/shared/shared.module';

@Module({
  imports: [FinancialManagementAppModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
