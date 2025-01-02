import { AuthenticationMethod } from '../authentication-method';
import { User } from '../../../user';
import { UserRepository } from '../../../user.repository';

export class UsernamePasswordAuthentication implements AuthenticationMethod {
  constructor(private readonly repository: UserRepository) {}

  /**
   * Implementación de autenticación basada en usuario y contraseña.
   * @param credentials Credenciales del usuario.
   * @returns Promise<boolean>
   */
  async authenticate(credentials: Record<string, string>): Promise<User | null> {
    const { username, password } = credentials;
    //return username === 'user' && password === 'password';
    const user = await this.repository.findByAttribute('username', username);
    if (user && user.passwordAutenticate(password)) {
      return user;
    }
    return null;
  }
}
