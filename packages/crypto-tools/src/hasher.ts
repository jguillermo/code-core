import { createHash, randomBytes } from 'crypto';

export class Hasher {
  private static readonly validAlgorithms = ['sha3-256', 'sha3-512', 'blake2b512', 'blake2s256'] as const;

  private saltToUse: string;

  constructor(
    private readonly algorithm: (typeof Hasher.validAlgorithms)[number],
    saltLength: number = 16,
  ) {
    if (!Hasher.validAlgorithms.includes(algorithm)) {
      throw new Error(`Invalid algorithm: ${algorithm}. Allowed algorithms are: ${Hasher.validAlgorithms.join(', ')}`);
    }
    if (saltLength <= 0) {
      throw new Error('Salt length must be a positive number.');
    }
    this.saltToUse = randomBytes(saltLength).toString('hex');
  }

  hash(text: string): string {
    return createHash(this.algorithm)
      .update(text + this.saltToUse)
      .digest('hex');
  }

  verify(text: string, hash: string): boolean {
    const generatedHash = this.hash(text);
    return generatedHash === hash;
  }
}
