import { BcryptPasswordEncryptor } from './client/bcrypt-password-encryptor';
import { PasswordEncryptor } from './password-encryptor';

export class PasswordEncryptorFactory {
  static create(algorithm: string, saltRounds: number = 10): PasswordEncryptor {
    switch (algorithm) {
      case BcryptPasswordEncryptor.name:
        return new BcryptPasswordEncryptor(saltRounds);
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }
}
