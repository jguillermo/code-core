import { PasswordEncryptor } from '../../domain/user/services/password-encryptor/password-encryptor';
import { PasswordEncryptorException } from './password-encryptor-exception';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

export class CryptoEncryptor extends PasswordEncryptor {
  private readonly saltLength: number;
  private readonly iterations: number;
  private readonly keyLength: number;
  private readonly digest: string;

  /**
   * @param {Object} options - Opciones de configuración.
   * @param {number} [options.saltLength=16] - Longitud de la sal en bytes. Una sal más larga incrementa la aleatoriedad y dificulta ataques como rainbow tables.
   * @param {number} [options.iterations=10000] - Número de iteraciones para el algoritmo PBKDF2. Más iteraciones aumentan la seguridad al hacerlo más costoso computacionalmente.
   * @param {number} [options.keyLength=64] - Longitud de la clave derivada en bytes. Claves más largas ofrecen mayor seguridad, pero incrementan el tamaño del hash.
   * @param {string} [options.digest='sha512'] - Algoritmo de digestión utilizado (como 'sha256', 'sha512'). Algoritmos más fuertes ofrecen mayor resistencia a ataques, pero requieren más recursos.
   */
  constructor({ saltLength = 16, iterations = 10000, keyLength = 64, digest = 'sha512' }: { saltLength?: number; iterations?: number; keyLength?: number; digest?: string } = {}) {
    super();

    const supportedDigests = crypto.getHashes();

    if (typeof saltLength !== 'number' || saltLength <= 8 || saltLength > 32) {
      throw new PasswordEncryptorException(`Invalid saltLength: ${saltLength}. It must be a positive number between 8 and 32.`);
    }

    if (typeof iterations !== 'number' || iterations <= 0 || iterations > 1000000) {
      throw new PasswordEncryptorException(`Invalid iterations: ${iterations}. It must be a positive number less than 1,000,000.`);
    }

    if (typeof keyLength !== 'number' || keyLength <= 0 || keyLength > 64) {
      throw new PasswordEncryptorException(`Invalid keyLength: ${keyLength}. It must be a positive number less than or equal to 64.`);
    }

    if (typeof digest !== 'string' || !supportedDigests.includes(digest)) {
      throw new PasswordEncryptorException(`Invalid digest algorithm: ${digest}. Supported digests are: ${supportedDigests.join(', ')}`);
    }

    this.saltLength = saltLength;
    this.iterations = iterations;
    this.keyLength = keyLength;
    this.digest = digest;
  }

  async encrypt(password: string): Promise<string> {
    const salt = crypto.randomBytes(this.saltLength).toString('hex');
    const derivedKey = await this.pbkdf2(password, salt);
    return `${salt}:${derivedKey}`;
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, originalHash] = hashedPassword.split(':');
    if (!salt || !originalHash) {
      throw new PasswordEncryptorException('Invalid hashed password format');
    }
    const derivedKey = await this.pbkdf2(password, salt);
    return crypto.timingSafeEqual(Buffer.from(derivedKey, 'hex'), Buffer.from(originalHash, 'hex'));
  }

  private pbkdf2(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, this.iterations, this.keyLength, this.digest, (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey.toString('hex'));
        }
      });
    });
  }
}
