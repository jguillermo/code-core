import { AccountId } from './types/account-id';
import { AccountName } from './types/account-name';
import { AccountType } from './types/account-type';
import { AccountCurrency } from './types/account-currency';
import { AccountBalance } from './types/account-balance';
import { AccountFinantialEntity } from './types/account-finantial-entity';
import { AccountAccountNumber } from './types/account-account-number';
import { AggregateTypes, CreatedAt, DataTypes } from '@code-core/domain';
import { AccountListTag } from './types/account-list-tag';

export class AccountTypes extends AggregateTypes {
  public readonly id: AccountId;
  public readonly name: AccountName;
  public readonly type: AccountType;
  public readonly currency: AccountCurrency;
  public readonly balance: AccountBalance;
  public readonly financialEntity: AccountFinantialEntity;
  public readonly number: AccountAccountNumber;
  public readonly tags: AccountListTag;
  public readonly creationDate: CreatedAt;

  constructor(currentLevel: number, params: DataTypes<AccountTypes>) {
    super(currentLevel);
    this.id = this.initializeType(AccountId, params.id);
    this.name = this.initializeType(AccountName, params.name);
    this.type = this.initializeType(AccountType, params.type);
    this.currency = this.initializeType(AccountCurrency, params.currency);
    this.balance = this.initializeType(AccountBalance, params.balance);
    this.financialEntity = this.initializeType(AccountFinantialEntity, params.financialEntity);
    this.number = this.initializeType(AccountAccountNumber, params.number);
    this.tags = this.initializeType(AccountListTag, params.tags);
    this.creationDate = this.initializeType(CreatedAt, params.creationDate);
  }
}