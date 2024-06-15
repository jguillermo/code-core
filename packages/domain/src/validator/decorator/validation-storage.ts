import {ValidatorMapI} from "./validators-map";

export class ValidationStorage {
  private static instance: ValidationStorage;
  //todo add simbol to replace intance class in ferenfrece
  private _validationMap: Map<any, Map<string, ValidatorMapI[]>>;

  private constructor() {
    this._validationMap = new Map();
  }

  static getInstance(): ValidationStorage {
    if (!ValidationStorage.instance) {
      ValidationStorage.instance = new ValidationStorage();
    }
    return ValidationStorage.instance;
  }

  addValidations2(cls: Function, propertyKey: string, validatorConfigs: ValidatorMapI[]) {
    if (!this._validationMap.has(cls)) {
      this._validationMap.set(cls, new Map());
    }
    const propertyValidations = this._validationMap.get(cls);
    if (!propertyValidations?.has(propertyKey)) {
      propertyValidations?.set(propertyKey, validatorConfigs);
    }
  }

  addValidations(cls: Function, propertyKey: string, validationConfigs: ValidatorMapI[]) {
    if (!this._validationMap.has(cls)) {
      this._validationMap.set(cls, new Map());
    }
    const propertyValidations = this._validationMap.get(cls);
    if (!propertyValidations?.has(propertyKey)) {
      propertyValidations?.set(propertyKey, []);
    }
    const existingValidations = propertyValidations?.get(propertyKey) || [];
    propertyValidations?.set(propertyKey, existingValidations.concat(validationConfigs));
  }

  getValidations(cls: Function, propertyKey: string): ValidatorMapI[] {
    return this._validationMap.get(cls)?.get(propertyKey) || [];
  }

  getAll(): Map<string, Map<any, ValidatorMapI[]>> {
    return this._validationMap;
  }

  log(): string {
    const validationObject: any = {};
    this._validationMap.forEach((propertiesMap, cls) => {
      validationObject[cls] = {};
      propertiesMap.forEach((validations, propertyKey) => {
        validationObject[cls][propertyKey] = validations;
      });
    });
    return JSON.stringify(validationObject, null, 2);
  }
}
