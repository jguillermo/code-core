import { AuthenticationMethod } from './authentication-method';
import { UsernamePasswordAuthentication } from './client/username-password-authentication';
import { AuthenticationMethods } from './authentication-methods.enum';
import { UserRepository } from '../../user.repository';

export class AuthenticationFactory {
  /**
   * Devuelve la estrategia de autenticación basada en el método solicitado.
   * @param method Nombre del método de autenticación.
   * @returns AuthenticationMethod
   */
  static getAuthenticationMethod(repository: UserRepository, method: string): AuthenticationMethod {
    switch (method) {
      case AuthenticationMethods.USERNAME_PASSWORD:
        return new UsernamePasswordAuthentication(repository);
      default:
        throw new Error(`Authentication method '${method}' is not supported.`);
    }
  }
}
