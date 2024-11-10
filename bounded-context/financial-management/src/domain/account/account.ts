import { AccountId } from './types/account-id';
import { AggregateRoot, PropertiesData } from '@code-core/domain';
import { AccountName } from './types/account-name';
import { AccountType } from './types/account-type';
import { AccountData } from './account.data';
import { AccountCurrency } from './types/account-currency';
import { AccountBalance } from './types/account-balance';
import { AccountFinantialEntity } from './types/account-finantial-entity';
import { AccountAccountNumber } from './types/account-account-number';
import { AccountTag } from './types/account-tag';

export class Account extends AggregateRoot {
  private readonly id: AccountId; // Nivel 1: Identificador único de la cuenta
  private readonly name: AccountName; // Nivel 1: Nombre descriptivo de la cuenta
  private readonly type: AccountType; // Nivel 1: Tipo de cuenta (Real o Virtual)
  private readonly currency: AccountCurrency; // Nivel 1: Moneda en la que opera la cuenta
  private readonly balance: AccountBalance; // Nivel 1: Saldo de la cuenta (Solo para cuentas reales)
  private readonly financialEntity: AccountFinantialEntity; // Nivel 2: Entidad financiera asociada (solo para cuentas bancarias o tarjetas de crédito)
  private readonly number: AccountAccountNumber; // Nivel 2: Número de cuenta (solo para cuentas reales)
  private readonly tags: AccountTag[]; // Nivel 3: Etiquetas para clasificar la cuenta (ej: "Proyecto A", "Centro de Costos")
  constructor(data: PropertiesData<AccountData>) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.currency = data.currency;
    this.balance = data.balance;
    this.financialEntity = data.financialEntity;
    this.number = data.number;
    this.tags = data.tags;
  }

  static createLevel1(data: AccountData): Account {
    return new Account({
      id: data.requireId(),
      name: data.requireName(),
      type: data.requireType(),
      currency: data.requireCurrency(),
      balance: data.requireBalance(),
      financialEntity: data.financialEntity ?? new AccountFinantialEntity(''),
      number: data.number ?? new AccountAccountNumber(''),
      tags: data.tags ?? [],
    });
  }

  // Métodos de negocio
  addFunds(amount: number): void {
    if (this.type.isReal()) {
      this.balance += amount;
    } else {
      throw new Error('Cannot add funds to a virtual account');
    }
  }

  withdrawFunds(amount: number): void {
    if (this.type.isReal()) {
      if (this.balance >= amount) {
        this.balance -= amount;
      } else {
        throw new Error('Insufficient funds');
      }
    } else {
      throw new Error('Cannot withdraw funds from a virtual account');
    }
  }

  addTag(tag: string): void {
    if (!this.tags?.includes(tag)) {
      this.tags?.push(tag);
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags?.filter((t) => t !== tag);
  }
}
