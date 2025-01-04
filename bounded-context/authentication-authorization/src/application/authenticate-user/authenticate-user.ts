import { AuthenticateUserDTO } from './authenticate-user.dto';
import { AuthenticationFactory } from '../../domain/user/services/authentication/authentication-factory';
import { UserRepository } from '../../domain/user/user.repository';
import { ApplicationException } from '@code-core/domain';
import { DataSigner } from '../../domain/user/services/sign/data-signer';
import { PasswordEncryptor } from '../../domain/user/services/password-encryptor/PasswordEncryptor';

export class AuthenticateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly dataSigner: DataSigner,
    private readonly passwordEncryptor: PasswordEncryptor,
  ) {}

  async execute(dto: AuthenticateUserDTO): Promise<string> {
    const authMethod = AuthenticationFactory.getAuthenticationMethod(dto.method, this.repository, this.passwordEncryptor);
    const user = await authMethod.authenticate(dto.credentials);
    if (!user) throw new ApplicationException('The user does not exist or the password is incorrect');
    const { id, roles, permissions, name } = user.toJson();
    return this.dataSigner.sign({ id, roles, permissions, name });
  }
}
