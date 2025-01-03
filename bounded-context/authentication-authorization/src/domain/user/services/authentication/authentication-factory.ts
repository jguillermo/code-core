import { AuthenticationMethod } from './authentication-method';
import { UsernamePasswordAuthentication } from './client/username-password-authentication';
import { AuthenticationClient } from './authentication-client';
import { UserRepository } from '../../user.repository';
import { DomainException } from '@code-core/domain';
import { PasswordEncryptor } from '../password-encryptor/PasswordEncryptor';

export class AuthenticationFactory {
  static getAuthenticationMethod(method: string, repository: UserRepository, passwordEncryptor: PasswordEncryptor): AuthenticationMethod {
    switch (method) {
      case AuthenticationClient.USERNAME_PASSWORD:
        return new UsernamePasswordAuthentication(repository, passwordEncryptor);
      default:
        throw new DomainException(`Authentication method '${method}' is not supported.`);
    }
  }
}
