import { AuthenticationMethod } from '../authentication-method';
import { User } from '../../../user';
import { UserRepository } from '../../../user.repository';
import { PasswordEncryptor } from '../../password-encryptor/PasswordEncryptor';

export class UsernamePasswordAuthentication implements AuthenticationMethod {
  constructor(
    private readonly repository: UserRepository,
    private readonly passwordEncryptor: PasswordEncryptor,
  ) {}

  async authenticate(credentials: Record<string, string>): Promise<User | null> {
    const { username, password } = credentials;
    const user = await this.repository.findByAttribute('username', username);
    if (!user) {
      return null;
    }
    const isPasswordValid = await this.passwordEncryptor.verify(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
