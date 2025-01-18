import { PasswordEncryptor } from '../password-encryptor';
import { PasswordEncryptorFactory } from '../password-encryptor-factory';
import { BcryptPasswordEncryptor } from './bcrypt-password-encryptor';

describe('BcryptPasswordEncryptor', () => {
  let encryptor: PasswordEncryptor;

  beforeEach(() => {
    encryptor = PasswordEncryptorFactory.create(BcryptPasswordEncryptor.name, 12); // Setting up with 12 salt rounds.
  });

  describe('Constructor', () => {
    it('should initialize with a valid saltRounds value', () => {
      expect(() => PasswordEncryptorFactory.create(BcryptPasswordEncryptor.name, 10)).not.toThrow();
    });

    it('should throw an error if saltRounds is less than 4', () => {
      expect(() => PasswordEncryptorFactory.create(BcryptPasswordEncryptor.name, 3)).toThrowError('Salt rounds must be between 4 and 31.');
    });

    it('should throw an error if saltRounds is greater than 31', () => {
      expect(() => PasswordEncryptorFactory.create(BcryptPasswordEncryptor.name, 32)).toThrowError('Salt rounds must be between 4 and 31.');
    });
  });

  describe('hashPassword', () => {
    it('should generate a valid hash for a password', async () => {
      const password = 'SecurePassword123!';
      const hash = await encryptor.hashPassword(password);
      expect(hash).toMatch(/^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/);
    });

    it('should generate unique hashes for the same password', async () => {
      const password = 'SecurePassword123!';
      const hash1 = await encryptor.hashPassword(password);
      const hash2 = await encryptor.hashPassword(password);
      expect(hash1).not.toEqual(hash2);
    });
  });

  describe('verifyPassword', () => {
    it('should successfully verify a valid password', async () => {
      const password = 'SecurePassword123!';
      const hash = await encryptor.hashPassword(password);
      const isValid = await encryptor.verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('should fail to verify an invalid password', async () => {
      const password = 'SecurePassword123!';
      const hash = await encryptor.hashPassword(password);
      const isValid = await encryptor.verifyPassword('WrongPassword!', hash);
      expect(isValid).toBe(false);
    });

    it('should fail to verify with a malformed hash', async () => {
      const isValid = await encryptor.verifyPassword('SecurePassword123!', '$2b$12$malformedhashXXXXXXXXXXXXXXXXXXXXXXX');
      expect(isValid).toBe(false);
    });
  });

  describe('isValidHash', () => {
    it('should return true for a valid bcrypt hash', () => {
      const validHash = '$2b$12$D5.xYyM96cGfD.g8O6jMkOt3kFKQoBJDdq9BdqjVwp3Xkrxjl5Nuq';
      expect(BcryptPasswordEncryptor.isValidHash(validHash)).toBe(true);
    });

    it('should return false for a malformed hash', () => {
      const invalidHash = '$2b$malformedhash';
      expect(BcryptPasswordEncryptor.isValidHash(invalidHash)).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(BcryptPasswordEncryptor.isValidHash('')).toBe(false);
    });

    it('should return false for a hash from a different algorithm', () => {
      const nonBcryptHash = 'sha256$abcdef1234567890';
      expect(BcryptPasswordEncryptor.isValidHash(nonBcryptHash)).toBe(false);
    });
  });
});
