import { AbstractType } from '../type/abstract-type';
import { getLevel, normalizeLevel } from '../level/level.decorator';
import { DomainException } from '../exceptions';

export class AggregateData {
  protected initializeType<T extends AbstractType<any>>(typeClass: { new (data: any): T; empty?: () => T }, currentLevel: number, data): T {
    const voLevel = getLevel(typeClass);
    const currentLevelNormalized = normalizeLevel(currentLevel);
    const isEmpty = data === null || data === undefined;
    if (voLevel > currentLevelNormalized && isEmpty) {
      if (typeClass.empty) {
        return typeClass.empty();
      }
      throw new DomainException(`${typeClass.name} cannot be static empty()`);
    }
    const typeInstance: T = new typeClass(data);
    if (!typeInstance.isValid()) {
      throw new DomainException(`${(typeClass as any).name}: ${typeInstance.validatorMessageStr()}`);
    }
    return typeInstance;
  }
}
