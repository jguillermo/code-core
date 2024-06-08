import {
  Allow,
  ArrayContains,
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotContains,
  ArrayNotEmpty,
  ArrayUnique,
  Contains,
  Equals,
  IsAlpha,
  IsAlphanumeric,
  IsArray,
  IsAscii,
  IsBase32,
  IsBase58,
  IsBase64,
  IsBIC,
  IsBoolean,
  IsBooleanString,
  IsBtcAddress,
  IsByteLength,
  IsCreditCard,
  IsCurrency,
  IsDataURI,
  IsDate,
  IsDateString,
  IsDecimal,
  IsDefined,
  IsDivisibleBy,
  IsEAN,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsEthereumAddress,
  IsFirebasePushId,
  IsFQDN,
  IsFullWidth,
  IsHalfWidth,
  IsHash,
  IsHexadecimal,
  IsHexColor,
  IsHSL,
  IsIBAN,
  IsIdentityCard,
  IsIn,
  IsInstance,
  IsInt,
  IsIP,
  IsISBN,
  IsISIN,
  IsISO31661Alpha2,
  IsISO31661Alpha3,
  IsISO4217CurrencyCode,
  IsISO8601,
  IsISRC,
  IsISSN,
  IsJSON,
  IsJWT,
  IsLatitude,
  IsLatLong,
  IsLocale,
  IsLongitude,
  IsLowercase,
  IsMACAddress,
  IsMagnetURI,
  IsMilitaryTime,
  IsMimeType,
  IsMobilePhone,
  IsMongoId,
  IsMultibyte,
  IsNegative,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNotIn,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOctal,
  IsOptional,
  IsPassportNumber,
  IsPhoneNumber,
  IsPort,
  IsPositive,
  IsPostalCode,
  IsRFC3339,
  IsRgbColor,
  IsSemVer,
  IsString,
  IsStrongPassword,
  IsSurrogatePair,
  IsTaxId,
  IsTimeZone,
  IsUppercase,
  IsUrl,
  IsUUID,
  IsVariableWidth,
  Length,
  Matches,
  Max,
  MaxDate,
  MaxLength,
  Min,
  MinDate,
  MinLength,
  NotContains,
  NotEquals,
  ValidationOptions,
} from 'class-validator';

export const validatorsMap = {
  Min,
  Max,
  IsEmail,
  IsDefined,
  IsOptional,
  Equals,
  NotEquals,
  IsEmpty,
  IsNotEmpty,
  IsIn,
  IsNotIn,
  IsBoolean,
  IsDate,
  IsString,
  IsNumber,
  IsInt,
  IsArray,
  IsEnum,
  IsDivisibleBy,
  IsPositive,
  IsNegative,
  MinDate,
  MaxDate,
  IsBooleanString,
  IsDateString,
  IsNumberString,
  Contains,
  NotContains,
  IsAlpha,
  IsAlphanumeric,
  IsDecimal,
  IsAscii,
  IsBase32,
  IsBase58,
  IsBase64,
  IsIBAN,
  IsBIC,
  IsByteLength,
  IsCreditCard,
  IsCurrency,
  IsISO4217CurrencyCode,
  IsEthereumAddress,
  IsBtcAddress,
  IsDataURI,
  IsFQDN,
  IsFullWidth,
  IsHalfWidth,
  IsVariableWidth,
  IsHexColor,
  IsHSL,
  IsRgbColor,
  IsIdentityCard,
  IsPassportNumber,
  IsPostalCode,
  IsHexadecimal,
  IsOctal,
  IsMACAddress,
  IsIP,
  IsPort,
  IsISBN,
  IsEAN,
  IsISIN,
  IsISO8601,
  IsJSON,
  IsJWT,
  IsObject,
  IsNotEmptyObject,
  IsLowercase,
  IsLatLong,
  IsLatitude,
  IsLongitude,
  IsMobilePhone,
  IsISO31661Alpha2,
  IsISO31661Alpha3,
  IsLocale,
  IsPhoneNumber,
  IsMongoId,
  IsMultibyte,
  IsSurrogatePair,
  IsTaxId,
  IsUrl,
  IsMagnetURI,
  IsUUID,
  IsFirebasePushId,
  IsUppercase,
  Length,
  MinLength,
  MaxLength,
  Matches,
  IsMilitaryTime,
  IsTimeZone,
  IsHash,
  IsMimeType,
  IsSemVer,
  IsISSN,
  IsISRC,
  IsRFC3339,
  IsStrongPassword,
  ArrayContains,
  ArrayNotContains,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  ArrayUnique,
  IsInstance,
  Allow
};

export interface ValidatorMapI {
  validator: keyof typeof validatorsMap | Function,
  value?: any,
  options?: ValidationOptions
}

export class ValidationStorage {
  private static instance: ValidationStorage;
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
