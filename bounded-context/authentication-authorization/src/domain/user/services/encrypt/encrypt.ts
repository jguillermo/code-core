export class EnigmaMachine {
  private ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  private ALPHABET_SIZE = this.ALPHABET.length;

  private pegboardMapping: Map<number, number>;
  private reflectorWiring: number[];
  private rotors: { wiring: number[]; notch: number; position: number }[];
  private initialRotorPositions: number[];

  constructor(baseHash: string) {
    const encodedBaseHash = this.encodeBase64(baseHash);
    this.pegboardMapping = this.generatePlugboardMapping(encodedBaseHash);
    this.reflectorWiring = this.generateReflectorWiring(encodedBaseHash);
    this.rotors = this.generateRotors(encodedBaseHash);
    this.initialRotorPositions = this.rotors.map((rotor) => rotor.position);
  }

  private encodeBase64(input: string): string {
    return Buffer.from(input, 'utf-8').toString('base64');
  }

  private decodeBase64(input: string): string {
    return Buffer.from(input, 'base64').toString('utf-8');
  }

  public resetRotors(): void {
    this.rotors.forEach((rotor, index) => {
      rotor.position = this.initialRotorPositions[index];
    });
  }

  private letterToNumber(letter: string): number {
    return this.ALPHABET.indexOf(letter);
  }

  private numberToLetter(number: number): string {
    return this.ALPHABET[number % this.ALPHABET_SIZE];
  }

  private hashToSeed(hash: string): number {
    let seed = 0;
    for (const char of hash) {
      seed = (seed * 31 + char.charCodeAt(0)) % 233280;
    }
    return seed;
  }

  private seededRandom(seed: number): () => number {
    return () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  private generatePlugboardMapping(baseHash: string): Map<number, number> {
    const mapping = new Map<number, number>();
    const random = this.seededRandom(this.hashToSeed(baseHash));

    const indices = Array.from({ length: this.ALPHABET_SIZE }, (_, i) => i);
    while (indices.length > 1) {
      const a = indices.splice(Math.floor(random() * indices.length), 1)[0];
      const b = indices.splice(Math.floor(random() * indices.length), 1)[0];
      mapping.set(a, b);
      mapping.set(b, a);
    }

    return mapping;
  }

  private generateReflectorWiring(baseHash: string): number[] {
    const random = this.seededRandom(this.hashToSeed(baseHash + '_reflector'));
    const indices = Array.from({ length: this.ALPHABET_SIZE }, (_, i) => i);
    const wiring = new Array<number>(this.ALPHABET_SIZE);

    while (indices.length > 1) {
      const a = indices.splice(Math.floor(random() * indices.length), 1)[0];
      const b = indices.splice(Math.floor(random() * indices.length), 1)[0];
      wiring[a] = b;
      wiring[b] = a;
    }

    // If there's an unpaired index (unlikely but possible with an odd ALPHABET_SIZE), map it to itself.
    if (indices.length === 1) {
      const remaining = indices[0];
      wiring[remaining] = remaining;
    }

    return wiring;
  }

  private generateRotors(baseHash: string) {
    const firstNumberInHash = parseInt(baseHash.match(/\d+/)?.[0] || '0', 10);
    const numRotors = firstNumberInHash + 3;

    return Array.from({ length: numRotors }, (_, i) => {
      const random = this.seededRandom(this.hashToSeed(baseHash + i));
      const wiring = Array.from({ length: this.ALPHABET_SIZE }, (_, i) => i).sort(() => random() - 0.5);
      const notch = Math.floor(random() * this.ALPHABET_SIZE);
      const position = Math.floor(random() * this.ALPHABET_SIZE);

      return { wiring, notch, position };
    });
  }

  private stepRotors(): void {
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      if (i === this.rotors.length - 1 || this.rotors[i + 1].position === this.rotors[i + 1].notch) {
        this.rotors[i].position = (this.rotors[i].position + 1) % this.ALPHABET_SIZE;
      } else {
        break;
      }
    }
  }

  private forwardThroughRotor(num: number, rotor: { wiring: number[]; position: number }): number {
    const shiftedIndex = (num + rotor.position) % this.ALPHABET_SIZE;
    return (rotor.wiring[shiftedIndex] - rotor.position + this.ALPHABET_SIZE) % this.ALPHABET_SIZE;
  }

  private backwardThroughRotor(num: number, rotor: { wiring: number[]; position: number }): number {
    return (rotor.wiring.indexOf((num + rotor.position) % this.ALPHABET_SIZE) - rotor.position + this.ALPHABET_SIZE) % this.ALPHABET_SIZE;
  }

  encode(message: string): string {
    this.resetRotors();
    return this.process(this.encodeBase64(message));
  }

  decode(message: string): string {
    this.resetRotors();
    return this.decodeBase64(this.process(message));
  }

  private process(message: string): string {
    return message
      .split('')
      .map((char) => {
        if (!this.ALPHABET.includes(char)) return char;

        let num = this.letterToNumber(char);
        this.stepRotors();

        num = this.pegboardMapping.get(num) ?? num;

        for (const rotor of this.rotors) {
          num = this.forwardThroughRotor(num, rotor);
        }

        num = this.reflectorWiring[num];

        for (const rotor of [...this.rotors].reverse()) {
          num = this.backwardThroughRotor(num, rotor);
        }

        num = this.pegboardMapping.get(num) ?? num;

        return this.numberToLetter(num);
      })
      .join('');
  }
}
