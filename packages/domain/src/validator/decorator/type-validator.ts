import 'reflect-metadata';
import {ValidationStorage, ValidatorMapI, validatorsMap} from "./validation-storage";

function registerDecorator(cls: Function, validatorConfigs: ValidatorMapI[], propertyKey: string) {
  validatorConfigs.forEach(config => {
    let validator: any;
    if (typeof config.validator === 'string' && validatorsMap[config.validator]) {
      validator = validatorsMap[config.validator];
      if (!validator) {
        throw new Error(`Validator ${config.validator} is not supported.`);
      }
    } else {
      validator = config.validator;
    }

    if (config.value) {
      validator(config.value, config.options)(cls.prototype, propertyKey);
    } else {
      validator(config.options)(cls.prototype, propertyKey);
    }
  });
  ValidationStorage.getInstance().addValidations(cls, propertyKey, validatorConfigs)
}

function applyParentValidations(cls: Function, propertyKey: string) {
  const parentPrototype = Object.getPrototypeOf(cls.prototype);
  if (parentPrototype && parentPrototype !== Object.prototype) {
    const parentValidatorConfigs = ValidationStorage.getInstance().getValidations(parentPrototype.constructor, propertyKey);
    if (parentValidatorConfigs.length > 0) {
      registerDecorator(cls, parentValidatorConfigs, propertyKey);
    }
  }
}

export function AddValidate(validatorConfigs: ValidatorMapI[], propertyKey: string = '_value') {
  return function (cls: Function) {
    applyParentValidations(cls, propertyKey);
    registerDecorator(cls, validatorConfigs, propertyKey);
  }
}


