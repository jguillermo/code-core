export abstract class DataSigner {
  abstract sign(payload: object): string;

  abstract verify(token: string): object | null;
}
