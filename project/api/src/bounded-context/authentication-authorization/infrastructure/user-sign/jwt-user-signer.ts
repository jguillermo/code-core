import { SignPayload, UserSigner } from '@bounded-context/authentication-authorization';
import { JWTDataSigner } from '@code-core/cypto-tools';

export class JwtUserSigner extends UserSigner {
  private signer: JWTDataSigner;

  constructor(secret: string) {
    super();

    this.signer = new JWTDataSigner(secret);
  }

  data(signedData: string): object {
    return this.signer.data(signedData);
  }

  sign(payload: SignPayload): string {
    return this.signer.sign(payload);
  }

  verify(token: string): SignPayload {
    return this.signer.verify(token) as SignPayload;
  }
}
