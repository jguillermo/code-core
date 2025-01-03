import { PasswordEncryptor } from './PasswordEncryptor';
import bcrypt from 'bcrypt';

export class BcryptEncryptor extends PasswordEncryptor {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    super();
    this.saltRounds = saltRounds;
  }

  async encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
