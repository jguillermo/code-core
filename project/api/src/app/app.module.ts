import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialManagementAppModule } from './financial-management-app/financial-management-app.module';
import { AuthenticationAuthorizationAppModule } from './authentication-authorization-app/authentication-authorization-app.module';
import { AuthenticationAuthorizationModule } from '../bounded-context/authentication-authorization/authentication-authorization.module';

@Module({
  imports: [
    FinancialManagementAppModule,
    AuthenticationAuthorizationModule,
    AuthenticationAuthorizationAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
