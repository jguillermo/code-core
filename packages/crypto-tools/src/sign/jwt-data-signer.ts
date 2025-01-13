import * as jwt from 'jsonwebtoken';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';

export class JWTDataSigner {
  private readonly secretKey: string;
  private readonly signOptions: SignOptions;
  private readonly verifyOptions: VerifyOptions;

  constructor(secretKey: string, signOptions: SignOptions = {}, verifyOptions: VerifyOptions = {}) {
    const MIN_SECRET_KEY_LENGTH = 16;

    if (typeof secretKey !== 'string' || secretKey.length < MIN_SECRET_KEY_LENGTH) {
      throw new Error(`La clave secreta debe ser una cadena de al menos ${MIN_SECRET_KEY_LENGTH} caracteres.`);
    }

    this.secretKey = secretKey;
    this.signOptions = signOptions;
    this.verifyOptions = verifyOptions;
  }

  sign(data: object): string {
    return jwt.sign(data, this.secretKey, this.signOptions);
  }

  verify(signedData: string): object {
    try {
      const data = jwt.verify(signedData, this.secretKey, this.verifyOptions) as object | null;
      return data ?? {};
    } catch (error) {
      throw new Error(`verify Error: ${(error as Error).message}`);
    }
  }

  data(signedData: string): object {
    try {
      const decoded = jwt.decode(signedData) as object | null;
      return decoded ?? {};
    } catch (error) {
      throw new Error(`data Error: ${(error as Error).message}`);
    }
  }
}
