import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialManagementAppModule } from './financial-management-app/financial-management-app.module';

@Module({
  imports: [FinancialManagementAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
