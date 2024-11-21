import { getLevel, Level, normalizeLevel } from './level.decorator';
import { AddValidate } from '../validator/decorator/type-validator';
import { IdType, StringTypeRequired } from '../type';
import { validate, Validate } from 'class-validator';
import { DomainValidator } from '../validator/domain-validator/domain-validator';
import { AggregateRoot } from '../aggregate/aggregate-root';
import { PrimitiveTypes } from '../primitive/primitive-types';
import { DomainException } from '../exceptions';

class CompanyId extends IdType {}

@Level(1)
@AddValidate([{ validator: 'MinLength', value: 5 }])
class CompanyName extends StringTypeRequired {}

@Level(2)
@AddValidate([{ validator: 'MinLength', value: 10 }])
class CompanyDescription extends StringTypeRequired {}

@Level(2)
@AddValidate([{ validator: 'MinLength', value: 15 }])
class CompanyAddress extends StringTypeRequired {}

@Level(3)
@AddValidate([{ validator: 'MinLength', value: 20 }])
class CompanySlug extends StringTypeRequired {}

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

  constructor(level: number, params: PrimitiveTypes<CompanyData>) {
    this.id = this.requireId(level, params.id);
    this.name = new CompanyName(params.name);
    this.description = new CompanyDescription(params.description);
    this.address = new CompanyAddress(params.address);
    this.slug = this.requireSlug(level, params.slug);
  }

  private requireId(level: number, data): CompanyId {
    this.requireProperty(CompanyId, level, data, 'Company Id is required');
    return new CompanyId(data);
  }

  private requireSlug(level: number, data): CompanySlug {
    this.requireProperty(CompanySlug, level, data, 'Company Id is required');
    return new CompanySlug(data);
  }

  private requireProperty<T>(type: any, level: number, property: T | undefined, errorMessage: string): void {
    const typeLevel = getLevel(type);
    const currentLevel = normalizeLevel(level);
    if (typeLevel > currentLevel) {
      return;
    }
    if (!property) {
      throw new DomainException(errorMessage);
    }
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

  static create(level: number, data: CompanyData): Company {
    const aggregate = new Company(data.id, data.name, data.description, data.address, data.slug);
    return aggregate;
  }

  toJson(): Required<PrimitiveTypes<CompanyData>> {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      address: this.address.value,
      slug: this.slug.value,
    };
  }
}

describe('validate level DomainValidator', () => {
  it('validate level 1 by default', async () => {
    const obj = new CompanyDto();
    obj.levelValidation = 1;

    const data = new CompanyData(1, {
      id: 'ddeddd9f-8fa7-4aea-815f-594a634d4f40',
      name: 'name',
      description: 'description',
      address: 'address',
      slug: 'slug',
    });
    const aggregate = Company.create(1, data);
    const errors = await validate(obj);
    expect(aggregate.toJson()).toEqual({
      id: 'ddeddd9f-8fa7-4aea-815f-594a634d4f40',
      name: 'name',
      description: 'description',
      address: 'address',
      slug: 'slug',
    });
    expect(errors.length).toEqual(2);
  });
});
