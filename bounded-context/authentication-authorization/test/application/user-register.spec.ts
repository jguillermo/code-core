import { User, UserPasswordEncryptor, UserRegister, UserRegisterDto, UserRepository } from '../../src';
import { UserObjectMother } from '../object-mother/user-object-mother';

import { Builder } from '@code-core/domain';

describe('User Register', () => {
  let useRegisterCase: UserRegister;
  let mockRepository: jest.Mocked<UserRepository>;
  let mockEncryptor: jest.Mocked<UserPasswordEncryptor>;
  let user: User;

  beforeEach(() => {
    user = UserObjectMother();

    mockRepository = {
      persist: jest.fn(),
      findById: jest.fn(),
      findByUserName: jest.fn().mockImplementation((username) => Promise.resolve(username === 'testUser' ? user : null)),
    } as jest.Mocked<UserRepository>;

    mockEncryptor = {
      encrypt: jest.fn().mockImplementation((password) => Promise.resolve(`${password}EncryptedPassword`)),
      verify: jest.fn().mockImplementation((password) => Promise.resolve(password === 'testPassword')),
    } as jest.Mocked<UserPasswordEncryptor>;

    useRegisterCase = new UserRegister(mockRepository, mockEncryptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Add user without credentials', () => {
    it('should register without credential', async () => {
      const userRegisterDto = Builder(UserRegisterDto)
        .id('b674d469-4893-4e6b-849b-c1f9775f950b')
        .name('testUser') // name
        .roles(['admin'])
        .build();
      await useRegisterCase.execute(userRegisterDto);
      expect(mockRepository.persist).toBeCalledTimes(1);
      expect(mockEncryptor.encrypt).toBeCalledTimes(0);
      const persistedUser = mockRepository.persist.mock.calls[0][0];
      expect(persistedUser).toBeInstanceOf(User);
      expect(persistedUser.toJson()).toEqual({
        id: 'b674d469-4893-4e6b-849b-c1f9775f950b',
        name: 'testUser',
        roles: ['admin'],
        authenticationDetails: null,
      });
    });
  });

  describe('Add user with user and password', () => {
    it('should register without credential', async () => {
      const userRegisterDto = Builder(UserRegisterDto)
        .id('b674d469-4893-4e6b-849b-c1f9775f950b')
        .name('testUser') // name
        .roles(['admin'])
        .details({
          username_password: {
            password: '123456',
            userName: 'admin',
          },
        })
        .build();
      await useRegisterCase.execute(userRegisterDto);
      expect(mockRepository.persist).toBeCalledTimes(1);
      expect(mockEncryptor.encrypt).toBeCalledTimes(1);
      const persistedUser = mockRepository.persist.mock.calls[0][0];
      expect(persistedUser).toBeInstanceOf(User);
      expect(persistedUser.toJson()).toEqual({
        id: 'b674d469-4893-4e6b-849b-c1f9775f950b',
        name: 'testUser',
        roles: ['admin'],
        authenticationDetails: {
          username_password: {
            password: '123456EncryptedPassword',
            userName: 'admin',
          },
        },
      });
    });
  });
});
