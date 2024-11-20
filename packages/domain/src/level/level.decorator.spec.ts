import 'reflect-metadata';
import { AbstractType } from '../type/abstract-type';
import { getLevel, Level, normalizeLevel } from './level.decorator';

describe('Level Decorator empty class', () => {
  it('should attach level metadata to a class', () => {
    @Level(1)
    class ExampleClass {}

    const level = getLevel(ExampleClass);

    expect(level).toBe(1);
  });

  it('should override existing level metadata if applied multiple times', () => {
    @Level(2)
    @Level(3) // Este es el decorador final aplicado
    class ExampleClass {}

    const level = getLevel(ExampleClass);

    expect(level).toBe(2);
  });

  it('should return undefined if no level metadata is set', () => {
    class NoLevelClass {}

    const level = getLevel(NoLevelClass);

    expect(level).toBe(1);
  });

  it('should handle multiple classes with independent levels', () => {
    @Level(1)
    class ClassOne {}

    @Level(2)
    class ClassTwo {}

    class ClassThree {}

    expect(getLevel(ClassOne)).toBe(1);
    expect(getLevel(ClassTwo)).toBe(2);
    expect(getLevel(ClassThree)).toBe(1);
  });
});

describe('Level Decorator types', () => {
  it('number', () => {
    @Level(1)
    class TestBaseType extends AbstractType<string, null> {
      protected filter(value: any): any {
        return value;
      }
    }

    const level = getLevel(TestBaseType);

    expect(level).toBe(1);
  });
});

describe('normalizeLevel', () => {
  it('should return the integer part of a positive float', () => {
    expect(normalizeLevel(5.7)).toBe(5);
    expect(normalizeLevel(1.1)).toBe(1);
    expect(normalizeLevel(1.0)).toBe(1);
    expect(normalizeLevel(100.99)).toBe(100);
  });

  it('should return the input if it is already a positive integer', () => {
    expect(normalizeLevel(3)).toBe(3);
    expect(normalizeLevel(100)).toBe(100);
  });

  it('should return 1 for negative numbers', () => {
    expect(normalizeLevel(-2)).toBe(1);
    expect(normalizeLevel(-10)).toBe(1);
    expect(normalizeLevel('-2')).toBe(1);
    expect(normalizeLevel(-0.1)).toBe(1);
  });

  it('should return 1 for float positive and less than 1', () => {
    expect(normalizeLevel(0.1)).toBe(1);
    expect(normalizeLevel(0.99)).toBe(1);
    expect(normalizeLevel(0.00001)).toBe(1);
  });

  it('should floor numeric strings to the nearest integer', () => {
    expect(normalizeLevel('4.9')).toBe(4);
    expect(normalizeLevel('100.9')).toBe(100);
    expect(normalizeLevel('1.1')).toBe(1);
  });

  it('should parse valid integer strings', () => {
    expect(normalizeLevel('10')).toBe(10);
    expect(normalizeLevel('100')).toBe(100);
    expect(normalizeLevel('1')).toBe(1);
  });

  it('should handle numeric strings with spaces', () => {
    expect(normalizeLevel('  5  ')).toBe(5);
    expect(normalizeLevel(' 100.9 ')).toBe(100);
    expect(normalizeLevel('   1   ')).toBe(1);
  });

  it('should return 1 for non-numeric strings', () => {
    expect(normalizeLevel('stringdemo')).toBe(1);
    expect(normalizeLevel('notANumber')).toBe(1);
    expect(normalizeLevel('abc123')).toBe(1);
    expect(normalizeLevel('')).toBe(1);
    expect(normalizeLevel(' ')).toBe(1);
  });

  it('should return 1 for null', () => {
    expect(normalizeLevel(null)).toBe(1);
  });

  it('should return 1 for undefined', () => {
    expect(normalizeLevel(undefined)).toBe(1);
  });

  it('should return 1 for objects', () => {
    expect(normalizeLevel({})).toBe(1);
    expect(normalizeLevel({ key: 'value' })).toBe(1);
  });

  it('should return 1 for arrays', () => {
    expect(normalizeLevel([])).toBe(1);
    expect(normalizeLevel([1, 2, 3])).toBe(1);
  });

  it('should return 1 for boolean values', () => {
    expect(normalizeLevel(true)).toBe(1);
    expect(normalizeLevel(false)).toBe(1);
  });

  it('should return 1 for special numeric values', () => {
    expect(normalizeLevel(Infinity)).toBe(1);
    expect(normalizeLevel(-Infinity)).toBe(1);
    expect(normalizeLevel(NaN)).toBe(1);
  });

  it('should handle numbers in scientific notation', () => {
    expect(normalizeLevel(1e2)).toBe(100); // 100
    expect(normalizeLevel(5e-1)).toBe(1); // 0.5 -> 1
    expect(normalizeLevel('1e2')).toBe(100); // "100"
  });

  it('should handle binary, octal, and hexadecimal numbers', () => {
    expect(normalizeLevel(0b101)).toBe(5); // Binary
    expect(normalizeLevel(0o77)).toBe(63); // Octal
    expect(normalizeLevel(0x1f)).toBe(31); // Hexadecimal
    expect(normalizeLevel('0x1F')).toBe(31); // Hexadecimal string
  });

  it('should handle edge cases for very large or small numbers', () => {
    expect(normalizeLevel(1e10)).toBe(10000000000);
    expect(normalizeLevel(1e-10)).toBe(1);
    expect(normalizeLevel('1e10')).toBe(10000000000);
    expect(normalizeLevel('1e-10')).toBe(1);
  });
});
