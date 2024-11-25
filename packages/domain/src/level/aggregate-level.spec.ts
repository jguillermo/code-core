import { getLevel, Level, normalizeLevel } from './level.decorator';
import { AddValidate } from '../validator/decorator/type-validator';
import { IdType, StringTypeRequired } from '../type';
import { Validate } from 'class-validator';
import { DomainValidator } from '../validator/domain-validator/domain-validator';
import { AggregateRoot } from '../aggregate/aggregate-root';
import { DataTypes } from '../primitive/primitive-types';
import { DomainException } from '../exceptions';
import { AbstractType } from '../type/abstract-type';

class CompanyId extends IdType {}

@Level(1)
@AddValidate([{ validator: 'MinLength', value: 1 }])
class CompanyName extends StringTypeRequired {}

@Level(2)
@AddValidate([{ validator: 'MinLength', value: 2 }])
class CompanyDescription extends StringTypeRequired {
  static empty(): CompanyDescription {
    return new CompanyDescription('');
  }
}

@Level(2)
@AddValidate([{ validator: 'MinLength', value: 3 }])
class CompanyAddress extends StringTypeRequired {
  static empty(): CompanyAddress {
    return new CompanyAddress('');
  }
}

@Level(3)
@AddValidate([{ validator: 'MinLength', value: 4 }])
class CompanySlug extends StringTypeRequired {
  static empty(): CompanySlug {
    return new CompanySlug('');
  }
}

class CompanyDto {
  @Validate(DomainValidator, [CompanyId])
  public id?: string;

  @Validate(DomainValidator, [CompanyName])
  public name?: string;

  @Validate(DomainValidator, [CompanyDescription])
  public description?: string;

  @Validate(DomainValidator, [CompanyAddress])
  public address?: string;

  @Validate(DomainValidator, [CompanySlug])
  public slug?: string;

  public levelValidation?: number;
}

class CompanyData {
  public readonly id: CompanyId;
  public readonly name: CompanyName;
  public readonly description: CompanyDescription;
  public readonly address: CompanyAddress;
  public readonly slug: CompanySlug;

  constructor(currentLevel: number, params: DataTypes<CompanyData>) {
    this.id = this.valuePropertie(CompanyId, currentLevel, params.id);
    this.name = this.valuePropertie(CompanyName, currentLevel, params.name);
    this.description = this.valuePropertie(CompanyDescription, currentLevel, params.description);
    this.address = this.valuePropertie(CompanyAddress, currentLevel, params.address);
    this.slug = this.valuePropertie(CompanySlug, currentLevel, params.slug);
  }

  private valuePropertie<T extends AbstractType<any>>(typeClass: { new (data: any): T; empty?: () => T }, currentLevel: number, data): T {
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

class Company extends AggregateRoot {
  constructor(
    private readonly id: CompanyId,
    private readonly name: CompanyName,
    private readonly description: CompanyDescription,
    private readonly address: CompanyAddress,
    private readonly slug: CompanySlug,
  ) {
    super();
  }

  static create(data: CompanyData): Company {
    return new Company(data.id, data.name, data.description, data.address, data.slug);
  }
}

describe('validate level DomainValidator', () => {
  it('validate level 1 by default', async () => {
    expect(() => {
      const obj = new CompanyDto();
      obj.levelValidation = 1;

      const data = new CompanyData(1, {
        id: 'ddeddd9f-8fa7-4aea-815f-594a634d4f40',
        name: 'name22',
        //description: 'description',
        //address: 'address',
        slug: 's',
      });
      Company.create(data);
    }).toThrowError('CompanySlug: must be longer than or equal to 4 characters');
  });
});
