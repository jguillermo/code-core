import { validate, Validate } from 'class-validator';

import { DomainValidator } from './domain-validator';
import { AddValidate } from '../decorator/type-validator';
import { StringTypeRequired } from '../../type';

@AddValidate([{ validator: 'MinLength', value: 5 }])
class PropertiesValidateTest extends StringTypeRequired {}

class EntityValidateTest {
  @Validate(DomainValidator, [PropertiesValidateTest])
  public name?: string;
}

describe('validate DomainValidator PropertiesValidateTest', () => {
  describe('primitive properties', () => {
    it('null', async () => {
      const object = new EntityValidateTest();
      const errors = await validate(object);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        domainValidator:
          '{"canBeString":"PropertiesValidateTest must be a string","isNotEmpty":"PropertiesValidateTest should not be empty","minLength":"PropertiesValidateTest must be longer than or equal to 5 characters"}',
      });
    });
    it('invalid value 123', async () => {
      const object = new EntityValidateTest();
      object.name = '123';
      const errors = await validate(object);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        domainValidator: '{"minLength":"PropertiesValidateTest must be longer than or equal to 5 characters"}',
      });
    });
    it('valid value', async () => {
      const object = new EntityValidateTest();
      object.name = 'valid value';
      const errors = await validate(object);
      expect(errors.length).toEqual(0);
    });
  });
});