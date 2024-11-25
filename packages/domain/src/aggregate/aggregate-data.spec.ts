import { Level } from '../level/level.decorator';
import { AddValidate } from '../validator/decorator/type-validator';
import { IdType, StringTypeRequired } from '../type';
import { Validate } from 'class-validator';
import { DomainValidator } from '../validator/domain-validator/domain-validator';
import { AggregateRoot } from './aggregate-root';
import { DataTypes } from '../primitive/primitive-types';
import { AggregateData } from './aggregate-data';

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

class CompanyData extends AggregateData {
  public readonly id: CompanyId;
  public readonly name: CompanyName;
  public readonly description: CompanyDescription;
  public readonly address: CompanyAddress;
  public readonly slug: CompanySlug;

  constructor(currentLevel: number, params: DataTypes<CompanyData>) {
    super();
    this.id = this.initializeType(CompanyId, currentLevel, params.id);
    this.name = this.initializeType(CompanyName, currentLevel, params.name);
    this.description = this.initializeType(CompanyDescription, currentLevel, params.description);
    this.address = this.initializeType(CompanyAddress, currentLevel, params.address);
    this.slug = this.initializeType(CompanySlug, currentLevel, params.slug);
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

describe('AggregateData Tests', () => {
  const companyIdString = 'ddeddd9f-8fa7-4aea-815f-594a634d4f40';
  describe('Constructor tests level 3', () => {
    it('should correctly initialize all fields when valid data is provided', () => {
      const data = new CompanyData(3, {
        id: companyIdString,
        name: 'ValidName',
        description: 'ValidDescription',
        address: 'ValidAddress',
        slug: 'ValidSlug',
      });

      expect(data.id).toBeInstanceOf(CompanyId);
      expect(data.id.value).toBe(companyIdString);
      expect(data.name).toBeInstanceOf(CompanyName);
      expect(data.name.value).toBe('ValidName');
      expect(data.description).toBeInstanceOf(CompanyDescription);
      expect(data.address).toBeInstanceOf(CompanyAddress);
      expect(data.slug).toBeInstanceOf(CompanySlug);
    });

    it('should throw an error if id is invalid', () => {
      expect(() => {
        new CompanyData(3, {
          id: '',
          name: 'ValidName',
          description: 'ValidDescription',
          address: 'ValidAddress',
          slug: 'ValidSlug',
        });
      }).toThrowError('Validation Error: Expected a valid UUID, but received "".');
    });

    it('should throw an error if name does not meet validation rules', () => {
      expect(() => {
        new CompanyData(3, {
          id: companyIdString,
          name: '',
          description: 'ValidDescription',
          address: 'ValidAddress',
          slug: 'ValidSlug',
        });
      }).toThrowError('CompanyName: should not be empty, must be longer than or equal to 1 characters');
    });

    it('should throw an error if description does not meet validation rules', () => {
      expect(() => {
        new CompanyData(3, {
          id: companyIdString,
          name: 'ValidName',
          description: 'A',
          address: 'ValidAddress',
          slug: 'ValidSlug',
        });
      }).toThrowError('CompanyDescription: must be longer than or equal to 2 characters');
    });

    it('should throw an error if address does not meet validation rules', () => {
      expect(() => {
        new CompanyData(3, {
          id: companyIdString,
          name: 'ValidName',
          description: 'ValidDescription',
          address: 'AB',
          slug: 'ValidSlug',
        });
      }).toThrowError('CompanyAddress: must be longer than or equal to 3 characters');
    });

    it('should throw an error if slug does not meet validation rules', () => {
      expect(() => {
        new CompanyData(3, {
          id: companyIdString,
          name: 'ValidName',
          description: 'ValidDescription',
          address: 'ValidAddress',
          slug: 'ABC',
        });
      }).toThrowError('CompanySlug: must be longer than or equal to 4 characters');
    });
  });

  describe('Level-based validation tests', () => {
    it('should allow empty description, address, and slug if currentLevel is 1', () => {
      const data = new CompanyData(1, {
        id: companyIdString,
        name: 'ValidName',
        description: undefined, // Below level
        address: undefined, // Below level
        slug: undefined, // Below level
      });

      expect(data.description.value).toBe('');
      expect(data.address.value).toBe('');
      expect(data.slug.value).toBe('');
    });

    it('should throw an error if description is required but empty due to level 2', () => {
      expect(() => {
        new CompanyData(2, {
          id: companyIdString,
          name: 'ValidName',
          description: undefined, // Level 2 requires description
          address: 'ValidAddress',
          slug: undefined,
        });
      }).toThrowError('CompanyDescription: must be a string, should not be empty, must be longer than or equal to 2 characters');
    });

    it('should throw an error if address is required but empty due to level 2', () => {
      expect(() => {
        new CompanyData(2, {
          id: companyIdString,
          name: 'ValidName',
          description: 'ValidDescription',
          address: undefined, // Level 2 requires address
          slug: 'ValidSlug',
        });
      }).toThrowError('CompanyAddress: must be a string, should not be empty, must be longer than or equal to 3 characters');
    });

    it('should allow empty slug if currentLevel is 2', () => {
      const data = new CompanyData(2, {
        id: companyIdString,
        name: 'ValidName',
        description: 'ValidDescription',
        address: 'ValidAddress',
        slug: undefined, // Below level
      });

      expect(data.slug.value).toBe('');
    });

    it('should throw an error if slug is required but empty due to level 3', () => {
      expect(() => {
        new CompanyData(3, {
          id: companyIdString,
          name: 'ValidName',
          description: 'ValidDescription',
          address: 'ValidAddress',
          slug: undefined, // Level 3 requires slug
        });
      }).toThrowError('CompanySlug: must be a string, should not be empty, must be longer than or equal to 4 characters');
    });
  });

  describe('Validation exception tests', () => {
    it('should throw a validation error with the correct message if any field fails validation', () => {
      expect(() => {
        new CompanyData(3, {
          id: companyIdString,
          name: 'ValidName',
          description: 'ValidDescription',
          address: 'AB', // Invalid address
          slug: 'ValidSlug',
        });
      }).toThrowError('CompanyAddress: must be longer than or equal to 3 characters');
    });

    it('should throw a DomainException with correct field name if instance validation fails', () => {
      expect(() => {
        new CompanyData(3, {
          id: companyIdString,
          name: 'ValidName',
          description: 'ValidDescription',
          address: 'ValidAddress',
          slug: 'ABC', // Invalid slug
        });
      }).toThrowError('CompanySlug: must be longer than or equal to 4 characters');
    });
  });

  describe('Edge case tests', () => {
    it('should throw an error if a required field is explicitly set to null', () => {
      expect(() => {
        new CompanyData(3, {
          id: companyIdString,
          name: 'ValidName',
          description: null as any, // Explicit null
          address: 'ValidAddress',
          slug: 'ValidSlug',
        });
      }).toThrowError('CompanyDescription: must be a string, should not be empty, must be longer than or equal to 2 characters');
    });

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
});
