import { LoginDto } from './login.dto';
import { AuthenticationFactory } from '../../domain/user/services/authentication/authentication-factory';
import { DataSigner, PasswordEncryptor, UserRepository } from '../../domain';
import { LoginResponse } from './login.response';
import { AuthenticationType } from '../../domain/user/services/authentication/authentication-type';
import { InvalidCredentialsException } from '../../domain/user/services/authentication/invalid-credentials.exception';

export class Login {
  constructor(
    private readonly repository: UserRepository,
    private readonly dataSigner: DataSigner,
    private readonly passwordEncryptor: PasswordEncryptor,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponse> {
    const authMethod = AuthenticationFactory.getAuthenticationMethod(new AuthenticationType(dto.type as any), this.repository, this.passwordEncryptor);
    const user = await authMethod.authenticate(dto.credentials ?? {});
    if (!user) throw new InvalidCredentialsException('The user credential is invalid', 'AUTH-001');
    const token = this.dataSigner.sign(user.payload());
    return new LoginResponse(token);
  }
}
