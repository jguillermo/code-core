import { Hasher } from './hasher';

describe('Hasher', () => {
  describe('Constructor', () => {
    it('should initialize correctly with valid algorithm and salt length', () => {
      const hasher = new Hasher('sha3-256', 16);
      expect(hasher).toBeDefined();
    });

    it('should throw an error if salt length is not positive', () => {
      expect(() => new Hasher('sha3-256', 0)).toThrowError('Salt length must be a positive number.');
      expect(() => new Hasher('sha3-256', -5)).toThrowError('Salt length must be a positive number.');
    });

    it('should allow only valid algorithms', () => {
      expect(() => new Hasher('sha3-256', 16)).not.toThrow();
      expect(() => new Hasher('sha3-512', 16)).not.toThrow();
      expect(() => new Hasher('blake2b512', 16)).not.toThrow();
      expect(() => new Hasher('blake2s256', 16)).not.toThrow();
      // Invalid algorithm
      expect(() => new Hasher('md5' as any, 16)).toThrow();
    });
  });

  describe('hash()', () => {
    let hasher: Hasher;

    beforeEach(() => {
      hasher = new Hasher('sha3-256', 16);
    });

    it('should generate a hash correctly', () => {
      const text = 'TestPassword123!';
      const hash = hasher.hash(text);
      expect(hash).toBeDefined();
      expect(hash).toMatch(/^[a-f0-9]+$/); // Hexadecimal output
    });

    it('should generate different hashes for different texts', () => {
      const text1 = 'TestPassword123!';
      const text2 = 'AnotherPassword!';
      const hash1 = hasher.hash(text1);
      const hash2 = hasher.hash(text2);
      expect(hash1).not.toEqual(hash2);
    });

    it('should generate consistent hash for the same text within the same instance', () => {
      const text = 'TestPassword123!';
      const hash1 = hasher.hash(text);
      const hash2 = hasher.hash(text);
      expect(hash1).toEqual(hash2);
    });
  });

  describe('verify()', () => {
    let hasher: Hasher;

    beforeEach(() => {
      hasher = new Hasher('sha3-512', 16);
    });

    it('should return true for valid hash verification', () => {
      const text = 'MySecurePassword123!';
      const hash = hasher.hash(text);
      const isValid = hasher.verify(text, hash);
      expect(isValid).toBe(true);
    });

    it('should return false for invalid hash verification', () => {
      const text = 'MySecurePassword123!';
      const wrongHash = 'abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234';
      const isValid = hasher.verify(text, wrongHash);
      expect(isValid).toBe(false);
    });

    it('should return false if the text does not match the hash', () => {
      const text = 'MySecurePassword123!';
      const wrongText = 'WrongPassword!';
      const hash = hasher.hash(text);
      const isValid = hasher.verify(wrongText, hash);
      expect(isValid).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    it('should work with different algorithms and produce valid hashes', () => {
      const algorithms = ['sha3-256', 'sha3-512', 'blake2b512', 'blake2s256'] as const;
      const text = 'IntegrationTestPassword!';
      algorithms.forEach((algorithm) => {
        const hasher = new Hasher(algorithm, 16);
        const hash = hasher.hash(text);
        expect(hash).toBeDefined();
        expect(hash).toMatch(/^[a-f0-9]+$/); // Hexadecimal format
        expect(hasher.verify(text, hash)).toBe(true); // Verification should pass
      });
    });
  });
});
