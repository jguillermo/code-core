import { UserRegisterDto } from './user-register.dto';
import { UserRepository } from '../../domain/user/user.repository';
import { UserPasswordEncryptor } from '../../domain/user/services/password-encryptor/user-password-encryptor';
import { User } from '../../domain/user/user';
import { UserTypes } from '../../domain/user/user.types';
import { AuthenticationDetails } from '../../domain/user/types/userAuthenticationDetails';

export class UserRegister {
  constructor(
    private readonly repository: UserRepository,
    private readonly userPasswordEncryptor: UserPasswordEncryptor,
  ) {}

  async execute(dto: UserRegisterDto): Promise<void> {
    const details = await this.encryptPassword(dto.details);
    const userData = new UserTypes(1, {
      id: dto.id as string,
      name: dto.name,
      roles: dto.roles,
      authenticationDetails: details,
    });
    const user = User.create(userData);
    await this.repository.persist(user);
    return;
  }

  async encryptPassword(details: AuthenticationDetails | null): Promise<AuthenticationDetails | null> {
    if (details === null) {
      return null;
    }
    if (details.username_password) {
      details.username_password.password = await this.userPasswordEncryptor.encrypt(details.username_password.password);
    }
    return details;
  }
}
