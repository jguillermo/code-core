import { Login } from '../../../src/application/login/login';
import { UserRepository } from '../../../src/domain/user/user.repository';
import { PasswordEncryptor } from '../../../src/domain/user/services/password-encryptor/password-encryptor';
import { DataSigner } from '../../../src/domain/user/services/sign/data-signer';
import { UserObjectMother } from '../../object-mother/user-object-mother';
import { LoginDto } from '../../../src/application/login/login.dto';
import { LoginResponse } from '../../../src/application/login/login.response';
import { Builder, DomainException } from '@code-core/domain';
import { User } from '../../../src/domain/user/user';
import { InvalidCredentialsException } from '../../../src/domain/user/services/authentication/invalid-credentials.exception';

describe('Auth Login', () => {
  let loginUseCase: Login;
  let mockRepository: jest.Mocked<UserRepository>;
  let mockSigner: jest.Mocked<DataSigner>;
  let mockEncryptor: jest.Mocked<PasswordEncryptor>;
  let user: User;

  beforeEach(() => {
    user = UserObjectMother();

    mockRepository = {
      findByUserName: jest.fn().mockImplementation((username) => Promise.resolve(username === 'testUser' ? user : null)),
    } as jest.Mocked<UserRepository>;

    mockSigner = {
      sign: jest.fn().mockReturnValue('token'),
      verify: jest.fn(),
    } as jest.Mocked<DataSigner>;

    mockEncryptor = {
      encrypt: jest.fn(),
      verify: jest.fn().mockImplementation((password) => Promise.resolve(password === 'testPassword')),
    } as jest.Mocked<PasswordEncryptor>;

    loginUseCase = new Login(mockRepository, mockSigner, mockEncryptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('UserPasswords', () => {
    it('should authenticate user and return a token', async () => {
      const loginDto = Builder(LoginDto).type('username_password').credentials({ username: 'testUser', password: 'testPassword' }).build();
      const response = await loginUseCase.execute(loginDto);
      expect(response).toBeInstanceOf(LoginResponse);
      expect(response.token).toBe('token');
    });

    it('should throw error if user does not exist', async () => {
      const loginDto = Builder(LoginDto).type('username_password').credentials({ username: 'invalidUser', password: 'testPassword' }).build();

      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(InvalidCredentialsException);
      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(
        expect.objectContaining({
          message: 'The user does not exist or the password is incorrect',
          code: 'AUTH-101',
        }),
      );
    });

    it('should throw error if authentication method is not supported', async () => {
      const loginDto = Builder(LoginDto).type('unsupported_method').credentials({ username: 'testUser', password: 'testPassword' }).build();
      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(DomainException);
      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(
        expect.objectContaining({
          message: 'Validation Error: Expected one of [username_password], but received "unsupported_method".',
        }),
      );
    });

    it('should throw error if password is incorrect', async () => {
      const loginDto = Builder(LoginDto).type('username_password').credentials({ username: 'testUser', password: 'wrongPassword' }).build();
      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(InvalidCredentialsException);
      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(
        expect.objectContaining({
          message: 'The user does not exist or the password is incorrect',
          code: 'AUTH-103',
        }),
      );
    });

    it('should throw error if token generation fails', async () => {
      mockSigner.sign.mockImplementation(() => {
        throw new Error('Token generation failed');
      });
      const loginDto = Builder(LoginDto).type('username_password').credentials({ username: 'testUser', password: 'testPassword' }).build();
      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(Error);
    });
  });
});
