import 'reflect-metadata';

const LEVEL = 'level';

export function getLevel(target: Function): number | undefined {
  return Reflect.getMetadata(LEVEL, target) ?? 1;
}

export function Level(level: number): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(LEVEL, level, target);
  };
}
