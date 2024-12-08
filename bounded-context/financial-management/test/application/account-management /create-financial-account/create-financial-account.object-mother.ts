import { IdType } from '@code-core/domain';
import { CreateFinancialAccountDto } from '../../../../src/application/account-management/create-financial-account/create-financial-account.dto';
import { faker } from '@faker-js/faker';

export abstract class ObjectMotherBase<T extends object> {
  /**
   * Genera una instancia de un DTO ajustada al nivel especificado, con exclusión opcional de propiedades.
   * @param level Nivel de validación y características.
   * @param override Valores que sobrescriben los predeterminados (opcional).
   * @param exclude Propiedades que deben ser excluidas del DTO final (opcional).
   * @returns Una instancia del DTO con las propiedades activas según el nivel y exclusiones.
   */
  static create<T extends object>(this: new () => ObjectMotherBase<T>, level: number, override: Partial<T> = {}, exclude: Array<keyof T> = []): T {
    const instance = new this();
    const defaultValues = instance.getDefaultValues();
    const activeProperties = instance.getActiveProperties(level);

    const result = activeProperties.reduce((dto, key) => {
      if (!exclude.includes(key)) {
        dto[key] = override[key] ?? defaultValues[key];
      }
      return dto;
    }, {} as Partial<T>);

    return Object.assign(instance.getNewDto(), result);
  }

  /**
   * Obtiene una nueva instancia del DTO específico.
   * Este método debe ser implementado en las subclases.
   */
  abstract getNewDto(): T;

  /**
   * Obtiene los valores predeterminados para las propiedades según el nivel.
   * Este método debe ser implementado en las subclases.
   */
  abstract getDefaultValues(): Partial<T>;

  /**
   * Obtiene las propiedades activas según el nivel.
   * Este método debe ser implementado en las subclases.
   */
  abstract getActiveProperties(level: number): Array<keyof T>;
}

export class CreateFinancialAccountObjectMother extends ObjectMotherBase<CreateFinancialAccountDto> {
  getNewDto(): CreateFinancialAccountDto {
    return new CreateFinancialAccountDto();
  }

  getDefaultValues(): Partial<CreateFinancialAccountDto> {
    return {
      id: IdType.random(),
      name: faker.company.name(),
      type: faker.helpers.arrayElement(['Real', 'Virtual']),
      currency: faker.finance.currencyCode(),
      balance: faker.number.int({ min: 0, max: 10000 }),
      financialEntity: faker.company.name(),
      accountNumber: faker.finance.currencyCode(),
      tags: [faker.lorem.word()],
    };
  }

  getActiveProperties(level: number): Array<keyof CreateFinancialAccountDto> {
    const propertiesByLevel: Record<number, Array<keyof CreateFinancialAccountDto>> = {
      1: ['id', 'name', 'type', 'currency', 'balance'],
      2: ['financialEntity', 'accountNumber'],
      3: ['tags'],
    };

    return Object.entries(propertiesByLevel)
      .filter(([lvl]) => Number(lvl) <= level)
      .flatMap(([, properties]) => properties);
  }
}
