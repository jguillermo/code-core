import { Module } from '@nestjs/common';
import { AuthenticationAuthorizationModule } from '../../bounded-context/authentication-authorization/authentication-authorization.module';
import { RegisterUserController } from './controller/register-user.controller';

@Module({
  controllers: [RegisterUserController],
  imports: [AuthenticationAuthorizationModule],
})
export class AuthenticationAuthorizationAppModule {}
