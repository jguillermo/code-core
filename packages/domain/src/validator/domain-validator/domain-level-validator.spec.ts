import { validate, Validate } from 'class-validator';

import { DomainValidator } from './domain-validator';
import { AddValidate } from '../decorator/type-validator';
import { StringTypeRequired } from '../../type';
import { Level } from '../../level/level.decorator';

@Level(1)
@AddValidate([{ validator: 'MinLength', value: 5 }])
class CourseLevelTitle extends StringTypeRequired {}

@Level(2)
@AddValidate([{ validator: 'MinLength', value: 5 }])
class CourseLevelDescription extends StringTypeRequired {
  static empty() {
    return new CourseLevelDescription('');
  }
}

@Level(2)
@AddValidate([{ validator: 'MinLength', value: 5 }])
class CourseLevelAddress extends StringTypeRequired {
  static empty() {
    return new CourseLevelAddress('');
  }
}

@Level(3)
@AddValidate([{ validator: 'MinLength', value: 5 }])
class CourseLevelSlug extends StringTypeRequired {
  static empty() {
    return new CourseLevelSlug('');
  }
}

class EntityValidateLevelTest {
  @Validate(DomainValidator, [CourseLevelTitle])
  public name?: string;

  @Validate(DomainValidator, [CourseLevelDescription])
  public description?: string;

  @Validate(DomainValidator, [CourseLevelAddress])
  public address?: string;

  @Validate(DomainValidator, [CourseLevelSlug])
  public slug?: string;

  public levelValidation?: number;
}

describe('validate level DomainValidator', () => {
  it('validate level 1 by default', async () => {
    const obj = new EntityValidateLevelTest();
    const errors = await validate(obj);
    expect(errors.length).toEqual(1);
  });
  it('validate level 1', async () => {
    const obj = new EntityValidateLevelTest();
    obj.levelValidation = 1;
    const errors = await validate(obj);
    expect(errors.length).toEqual(1);
  });
  it('validate level 1, min value 1', async () => {
    const obj = new EntityValidateLevelTest();
    obj.levelValidation = 0;
    const errors = await validate(obj);
    expect(errors.length).toEqual(1);
  });
  it('validate level 2', async () => {
    const obj = new EntityValidateLevelTest();
    obj.levelValidation = 2;
    const errors = await validate(obj);
    expect(errors.length).toEqual(3);
  });
  it('validate level 3', async () => {
    const obj = new EntityValidateLevelTest();
    obj.levelValidation = 3;
    const errors = await validate(obj);
    expect(errors.length).toEqual(4);
  });
});

describe('validate level DomainValidator', () => {
  it('validate level 1 string', async () => {
    const obj = new EntityValidateLevelTest();
    obj.levelValidation = '1' as any;
    const errors = await validate(obj);
    expect(errors.length).toEqual(1);
  });
  it('validate level number any string', async () => {
    const obj = new EntityValidateLevelTest();
    obj.levelValidation = 'stringdemo' as any;
    const errors = await validate(obj);
    expect(errors.length).toEqual(1);
  });
});
