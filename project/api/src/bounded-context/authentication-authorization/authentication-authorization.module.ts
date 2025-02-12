import { Module } from '@nestjs/common';

import { MongoDBUserRepository } from './infrastructure/user-repository/mongodb/MongoDBUserRepository';
import {
  Login,
  UserPasswordEncryptor,
  UserRepository,
  UserSigner,
} from '@bounded-context/authentication-authorization';
import { JwtUserSigner } from './infrastructure/user-sign/jwt-user-signer';
import { BcryptUserPasswordEncryptor } from './infrastructure/user-password-encryptor/bcrypt-user-password-encryptor';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: MongoDBUserRepository,
    },
    {
      provide: UserSigner,
      useFactory: () => new JwtUserSigner('secret'),
    },
    {
      provide: UserPasswordEncryptor,
      useFactory: () => new BcryptUserPasswordEncryptor(),
    },
    {
      provide: Login,
      useFactory: (
        userRepository: UserRepository,
        userSigner: UserSigner,
        userPasswordEncryptor: UserPasswordEncryptor,
      ) => new Login(userRepository, userSigner, userPasswordEncryptor),
      inject: [UserRepository, UserSigner, UserPasswordEncryptor],
    },
  ],
})
export class AuthenticationAuthorizationModule {}
