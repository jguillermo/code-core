import * as bcrypt from 'bcrypt';
import { PasswordEncryptor } from '../password-encryptor';

export class BcryptPasswordEncryptor extends PasswordEncryptor {
  /**
   * Constructor for the PasswordEncryptor class.
   * @param saltRounds Number of salt rounds to generate the hashes (default is 10).
   */
  constructor(saltRounds: number = 10) {
    super(saltRounds);
  }

  /**
   * Generates a secure hash for a password.
   * @param password The plain text password.
   * @returns The generated hash.
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this._saltRounds);
  }

  /**
   * Verifies if a password matches its hash.
   * @param password The plain text password.
   * @param hash The hash to compare with.
   * @returns True if they match, otherwise false.
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Validates if a hash is a valid bcrypt hash.
   * @param hash The hash to validate.
   * @returns True if the hash is valid, otherwise false.
   */
  static isValidHash(hash: string): boolean {
    const bcryptRegex = /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/;
    return bcryptRegex.test(hash);
  }
}
