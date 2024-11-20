import 'reflect-metadata';
import { AbstractType } from '../type/abstract-type';
import { getLevel, Level } from './level.decorator';

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
