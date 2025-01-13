import * as jwt from 'jsonwebtoken';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { DataSigner, DataSignerException, SignPayload } from '@bounded-context/authentication-authorization';

export class JWTDataSigner extends DataSigner {
  private readonly secretKey: string;
  private readonly signOptions: SignOptions;
  private readonly verifyOptions: VerifyOptions;

  constructor(secretKey: string, signOptions: SignOptions = {}, verifyOptions: VerifyOptions = {}) {
    super();

    const MIN_SECRET_KEY_LENGTH = 16;

    if (typeof secretKey !== 'string' || secretKey.length < MIN_SECRET_KEY_LENGTH) {
      throw new Error(`La clave secreta debe ser una cadena de al menos ${MIN_SECRET_KEY_LENGTH} caracteres.`);
    }

    this.secretKey = secretKey;
    this.signOptions = signOptions;
    this.verifyOptions = verifyOptions;
  }

  sign(data: SignPayload): string {
    return jwt.sign(data.toJson(), this.secretKey, this.signOptions);
  }

  verify(signedData: string): SignPayload {
    try {
      const data = jwt.verify(signedData, this.secretKey, this.verifyOptions) as object | null;
      return SignPayload.create(data);
    } catch (error) {
      throw new DataSignerException(`verify Error: ${(error as Error).message}`);
    }
  }

  data(signedData: string): object {
    try {
      const decoded = jwt.decode(signedData) as object | null;
      return SignPayload.create(decoded).toJson();
    } catch (error) {
      throw new DataSignerException(`data Error: ${(error as Error).message}`);
    }
  }
}
