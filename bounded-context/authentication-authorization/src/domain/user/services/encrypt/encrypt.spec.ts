import { EnigmaMachine } from './encrypt';

describe('EnigmaMachine', () => {
  const baseHash = 'testhash';

  it('should reset rotor positions to initial state', () => {
    const machine = new EnigmaMachine(baseHash);

    // Step the rotors by processing a few characters
    machine.process('TEST');

    // Save the rotor positions after processing
    const positionsAfterProcessing = machine.rotors.map((rotor) => rotor.position);

    // Reset the rotors
    machine.resetRotors();

    // Save the rotor positions after resetting
    const positionsAfterReset = machine.rotors.map((rotor) => rotor.position);

    // Ensure that reset restored the initial positions
    expect(positionsAfterReset).not.toEqual(positionsAfterProcessing);
    expect(positionsAfterReset).toEqual(machine.initialRotorPositions);
  });
  it('should correctly step the rotors during processing', () => {
    const machine = new EnigmaMachine(baseHash);
    const message = 'TEST';

    // Save initial rotor positions
    const initialPositions = machine.rotors.map((rotor) => rotor.position);

    // Process the message
    machine.process(message);

    // Save positions after processing
    const positionsAfterProcessing = machine.rotors.map((rotor) => rotor.position);

    // Check that positions after processing are not equal to initial positions
    expect(positionsAfterProcessing).not.toEqual(initialPositions);
  });

  it('should ensure plugboard mapping is symmetric', () => {
    const machine = new EnigmaMachine(baseHash);

    machine.pegboardMapping.forEach((value, key) => {
      expect(machine.pegboardMapping.get(value)).toBe(key);
    });
  });

  it('should ensure reflector wiring is symmetric', () => {
    const machine = new EnigmaMachine(baseHash);

    machine.reflectorWiring.forEach((value, index) => {
      expect(machine.reflectorWiring[value]).toBe(index);
    });
  });

  it('should correctly process a message and reset rotors manually', () => {
    const machine = new EnigmaMachine(baseHash);
    const message = 'HELLO WORLD';

    // Encrypt the message
    const encrypted = machine.process(message);

    // Reset the rotors to decrypt
    machine.resetRotors();

    const decrypted = machine.process(encrypted);

    expect(decrypted).toBe(message);
  });

  it('should handle messages with unsupported characters', () => {
    const machine = new EnigmaMachine(baseHash);
    const message = 'HELLO123!';

    // Encrypt the message
    const encrypted = machine.process(message);

    // Reset the rotors to decrypt
    machine.resetRotors();

    const decrypted = machine.process(encrypted);

    expect(decrypted).toBe(message);
  });

  it('should handle empty messages without errors', () => {
    const machine = new EnigmaMachine(baseHash);
    const message = '';

    const encrypted = machine.process(message);
    machine.resetRotors();
    const decrypted = machine.process(encrypted);

    expect(decrypted).toBe(message);
  });

  it('should produce consistent results for the same configuration', () => {
    const machine1 = new EnigmaMachine(baseHash);
    const machine2 = new EnigmaMachine(baseHash);
    const message = 'HELLO WORLD';

    const encrypted1 = machine1.process(message);
    const encrypted2 = machine2.process(message);

    expect(encrypted1).toBe(encrypted2);
  });

  it('should step rotors correctly after processing characters', () => {
    const machine = new EnigmaMachine(baseHash);
    const message = 'ABC';

    const encrypted1 = machine.process(message[0]);
    const encrypted2 = machine.process(message[1]);
    const encrypted3 = machine.process(message[2]);

    expect(encrypted1).not.toBe(encrypted2);
    expect(encrypted2).not.toBe(encrypted3);
  });

  it('should handle long messages without errors', () => {
    const machine = new EnigmaMachine(baseHash);
    const message = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG 1234567890';

    const encrypted = machine.process(message);
    machine.resetRotors();
    const decrypted = machine.process(encrypted);

    expect(decrypted).toBe(message);
  });

  it('should handle a single character message', () => {
    const machine = new EnigmaMachine(baseHash);
    const message = 'A';

    const encrypted = machine.process(message);
    machine.resetRotors();
    const decrypted = machine.process(encrypted);

    expect(decrypted).toBe(message);
  });

  it('should not mutate the original message', () => {
    const machine = new EnigmaMachine(baseHash);
    const message = 'HELLO';
    const originalMessage = message.slice();

    machine.process(message);

    expect(message).toBe(originalMessage);
  });

  it('should handle different base hashes producing different results', () => {
    const machine1 = new EnigmaMachine('hash1');
    const machine2 = new EnigmaMachine('hash2');
    const message = 'HELLO WORLD';

    const encrypted1 = machine1.process(message);
    const encrypted2 = machine2.process(message);

    expect(encrypted1).not.toBe(encrypted2);
  });
});
