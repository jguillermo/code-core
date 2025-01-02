import { AuthenticationMethod } from './authentication-method';
import { UsernamePasswordAuthentication } from './client/username-password-authentication';
import { AuthenticationClient } from './authentication-client';
import { UserRepository } from '../../user.repository';
import { DomainException } from '@code-core/domain';

export class AuthenticationFactory {
  /**
   * Devuelve la estrategia de autenticación basada en el método solicitado.
   * @param method Nombre del método de autenticación.
   * @returns AuthenticationMethod
   */
  static getAuthenticationMethod(repository: UserRepository, method: string): AuthenticationMethod {
    switch (method) {
      case AuthenticationClient.USERNAME_PASSWORD:
        return new UsernamePasswordAuthentication(repository);
      default:
        throw new DomainException(`Authentication method '${method}' is not supported.`);
    }
  }
}
