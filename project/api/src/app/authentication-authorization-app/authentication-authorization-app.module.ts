import { Module } from '@nestjs/common';
import { LoginController } from './controller/login/login.controller';

@Module({
  controllers: [LoginController],
})
export class AuthenticationAuthorizationAppModule {}
