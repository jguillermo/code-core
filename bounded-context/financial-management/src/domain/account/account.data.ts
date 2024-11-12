import { AccountId } from './types/account-id';
import { AccountName } from './types/account-name';
import { AccountType } from './types/account-type';
import { DomainException } from '@code-core/domain/dist/exceptions';
import { AccountCurrency } from './types/account-currency';
import { AccountBalance } from './types/account-balance';
import { AccountFinantialEntity } from './types/account-finantial-entity';
import { AccountAccountNumber } from './types/account-account-number';
import { AccountTag } from './types/account-tag';
import { CreatedAt, PrimitiveTypes } from '@code-core/domain';

export class AccountData {
  public readonly id?: AccountId;
  public readonly name?: AccountName;
  public readonly type?: AccountType;
  public readonly currency?: AccountCurrency;
  public readonly balance?: AccountBalance;
  public readonly financialEntity?: AccountFinantialEntity;
  public readonly number?: AccountAccountNumber;
  public readonly tags?: AccountTag[];
  public readonly creationDate?: CreatedAt;

  constructor(params: PrimitiveTypes<AccountData>) {
    this.id = params.id ? new AccountId(params.id) : undefined;
    this.name = params.name ? new AccountName(params.name) : undefined;
    this.type = params.type ? new AccountType(params.type as any) : undefined; //todo: mejorar el contructor de un enum, acepte, enum pp primitite type
    this.currency = params.currency ? new AccountCurrency(params.currency) : undefined;
    this.balance = params.balance ? new AccountBalance(params.balance) : undefined;
    this.financialEntity = params.financialEntity ? new AccountFinantialEntity(params.financialEntity) : undefined;
    this.number = params.number ? new AccountAccountNumber(params.number) : undefined;
    this.tags = params.tags ? params.tags.map((tag) => new AccountTag(tag)) : undefined;

    this.creationDate = params.creationDate ? new CreatedAt(params.creationDate) : undefined;
  }

  requireId(): AccountId {
    return this.ensureProperty(this.id, 'Account Id is required');
  }

  private ensureProperty<T>(property: T | undefined, errorMessage: string): T {
    if (!property) {
      throw new DomainException(errorMessage);
    }
    return property;
  }

  requireName() {
    return this.ensureProperty(this.name, 'Account Name is required');
  }

  requireType() {
    return this.ensureProperty(this.type, 'Account Type is required');
  }

  requireCurrency() {
    return this.ensureProperty(this.currency, 'Account Currency is required');
  }

  requireBalance() {
    return this.ensureProperty(this.balance, 'Account Balance is required');
  }

  requireFinancialEntity() {
    return this.ensureProperty(this.financialEntity, 'Account Financial Entity is required');
  }

  requireNumber() {
    return this.ensureProperty(this.number, 'Account Number is required');
  }

  requireTags() {
    return this.ensureProperty(this.tags, 'Account Tags is required');
  }
}
