import { SodiumInitializer } from './sodium-initializer';

export class Hasher {
  private static readonly validAlgorithms = ['sha256', 'sha512', 'blake2b'] as const;

  private saltToUse: Uint8Array;

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
    this.saltToUse = new Uint8Array(saltLength);
  }

  async hash(text: string): Promise<string> {
    const sodium = await SodiumInitializer.getSodium(); // Obtener Libsodium inicializado

    // Generar sal si aún no existe
    if (this.saltToUse.every((byte) => byte === 0)) {
      this.saltToUse = sodium.randombytes_buf(this.saltToUse.length);
    }

    // Convertir texto y sal a Uint8Array
    const textBytes = sodium.from_string(text);
    const combined = new Uint8Array(textBytes.length + this.saltToUse.length);
    combined.set(textBytes);
    combined.set(this.saltToUse, textBytes.length);

    // Aplicar el algoritmo seleccionado
    let hash: Uint8Array;
    switch (this.algorithm) {
      case 'sha256':
        hash = sodium.crypto_hash_sha256(combined);
        break;
      case 'sha512':
        hash = sodium.crypto_hash_sha512(combined);
        break;
      case 'blake2b':
        hash = sodium.crypto_generichash(sodium.crypto_generichash_BYTES, combined);
        break;
    }
    return sodium.to_hex(hash);
  }

  async verify(text: string, hash: string): Promise<boolean> {
    const generatedHash = await this.hash(text);
    return generatedHash === hash;
  }
}
