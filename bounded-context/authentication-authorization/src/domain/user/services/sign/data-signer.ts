import { SignPayload } from './sign-payload';

export abstract class DataSigner {
  abstract sign(payload: SignPayload): string;

  abstract verify(token: string): SignPayload;

  abstract data(signedData: string): object;
}
