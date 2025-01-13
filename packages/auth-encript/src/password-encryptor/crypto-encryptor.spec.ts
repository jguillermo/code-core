import { CryptoEncryptor } from './crypto-encryptor';

describe('CryptoEncryptor', () => {
  let encryptor: CryptoEncryptor;

  beforeEach(() => {
    encryptor = new CryptoEncryptor({
      saltLength: 16,
      iterations: 10000,
      keyLength: 64,
      digest: 'sha512',
    });
  });

  describe('encrypt', () => {
    it('should generate a hash with the correct format', async () => {
      const password = 'testPassword';
      const hash = await encryptor.encrypt(password);
      expect(hash).toMatch(/^[a-f0-9]{32}:[a-f0-9]+$/);
    });

    it('should generate different hashes for the same password due to unique salts', async () => {
      const password = 'testPassword';
      const hash1 = await encryptor.encrypt(password);
      const hash2 = await encryptor.encrypt(password);
      expect(hash1).not.toEqual(hash2);
    });

    it('should throw an error if password is not provided', async () => {
      await expect(encryptor.encrypt(null as any)).rejects.toThrow();
    });
  });

  describe('verify', () => {
    it('should return true for a valid password and hash', async () => {
      const password = 'testPassword';
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid password', async () => {
      const password = 'testPassword';
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify('wrongPassword', hash);
      expect(isValid).toBe(false);
    });

    it('should throw an error for an improperly formatted hash', async () => {
      const password = 'testPassword';
      const malformedHash = 'invalidHashFormat';
      await expect(encryptor.verify(password, malformedHash)).rejects.toThrow('Invalid hashed password format');
    });
  });

  describe('edge cases', () => {
    it('should handle passwords with special characters', async () => {
      const password = 'P@$$w0rd!';
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    it('should handle empty passwords', async () => {
      const password = '';
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    test('should handle empty passwords', async () => {
      const password = '';
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    test('should handle passwords with spaces', async () => {
      const password = '  password with spaces  ';
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    test('should handle passwords with special characters', async () => {
      const password = '@#$%^&*()!';
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    test('should reject malformed hashes', async () => {
      const password = 'validPassword';
      const malformedHash = 'invalidHashFormat';
      await expect(encryptor.verify(password, malformedHash)).rejects.toThrow('Invalid hashed password format');
    });

    test('should handle very long passwords', async () => {
      const password = 'a'.repeat(1000); // 1000 characters
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    test('should reject invalid digest algorithms', () => {
      expect(() => new CryptoEncryptor({ digest: 'invalid-digest' })).toThrow();
    });

    test('should handle passwords with Unicode characters', async () => {
      const password = '你好😊';
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    test('should handle passwords with script injections', async () => {
      const password = "<script>alert('xss')</script>";
      const hash = await encryptor.encrypt(password);
      const isValid = await encryptor.verify(password, hash);
      expect(isValid).toBe(true);
    });

    test('should fail if salt length is too short', async () => {
      expect(() => new CryptoEncryptor({ saltLength: 1 })).toThrow();
    });
  });
  describe('Configuration limits', () => {
    test('should accept maximum valid saltLength', () => {
      expect(() => new CryptoEncryptor({ saltLength: 32 })).not.toThrow();
    });

    test('should throw error for saltLength above maximum', () => {
      expect(() => new CryptoEncryptor({ saltLength: 33 })).toThrow('Invalid saltLength');
    });

    test('should accept maximum valid iterations', () => {
      expect(() => new CryptoEncryptor({ iterations: 1000000 })).not.toThrow();
    });

    test('should throw error for iterations above maximum', () => {
      expect(() => new CryptoEncryptor({ iterations: 1000001 })).toThrow('Invalid iterations');
    });

    test('should accept maximum valid keyLength', () => {
      expect(() => new CryptoEncryptor({ keyLength: 64 })).not.toThrow();
    });

    test('should throw error for keyLength above maximum', () => {
      expect(() => new CryptoEncryptor({ keyLength: 65 })).toThrow('Invalid keyLength');
    });
  });
  describe('Performance and concurrency', () => {
    it('should handle multiple concurrent encryption requests', async () => {
      const password = 'concurrentPassword';
      const promises = Array.from({ length: 10 }).map(() => encryptor.encrypt(password));
      const hashes = await Promise.all(promises);
      expect(hashes).toHaveLength(10);
      hashes.forEach((hash) => {
        expect(hash).toMatch(/^[a-f0-9]{32}:[a-f0-9]+$/);
      });
    });

    it('should handle multiple concurrent verification requests', async () => {
      const password = 'concurrentVerify';
      const hash = await encryptor.encrypt(password);
      const promises = Array.from({ length: 10 }).map(() => encryptor.verify(password, hash));
      const results = await Promise.all(promises);
      results.forEach((result) => {
        expect(result).toBe(true);
      });
    });
  });
});
