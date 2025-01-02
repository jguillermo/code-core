import jwt, { JwtPayload } from 'jsonwebtoken';
import { DataSigner } from './data-signer';

export class JWTDataSigner extends DataSigner {
  constructor(private readonly secretKey: string) {
    super();
  }

  sign(data: object): string {
    return jwt.sign(data, this.secretKey);
  }

  verify(signedData: string): object | null {
    try {
      return jwt.verify(signedData, this.secretKey) as JwtPayload;
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return null;
    }
  }
}
