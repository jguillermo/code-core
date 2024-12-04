import { AccountId } from './types/account-id';
import { AggregateRoot, CreatedAt, DomainException, PrimitiveTypes } from '@code-core/domain';
import { AccountName } from './types/account-name';
import { AccountType } from './types/account-type';
import { AccountData } from './account.data';
import { AccountCurrency } from './types/account-currency';
import { AccountBalance } from './types/account-balance';
import { AccountFinantialEntity } from './types/account-finantial-entity';
import { AccountAccountNumber } from './types/account-account-number';
import { AccountListTag } from './types/account-list-tag';
import { AccountCreatedEvent } from './events/account-created.event';

export class Account extends AggregateRoot {
  constructor(
    private readonly id: AccountId, // Nivel 1: Identificador único de la cuenta
    private readonly name: AccountName, // Nivel 1: Nombre descriptivo de la cuenta
    private readonly type: AccountType, // Nivel 1: Tipo de cuenta (Real o Virtual)
    private readonly currency: AccountCurrency, // Nivel 1: Moneda en la que opera la cuenta
    private balance: AccountBalance, // Nivel 1: Saldo de la cuenta (Solo para cuentas reales)
    private readonly financialEntity: AccountFinantialEntity, // Nivel 2: Entidad financiera asociada (solo para cuentas bancarias o tarjetas de crédito)
    private readonly number: AccountAccountNumber, // Nivel 2: Número de cuenta (solo para cuentas reales)
    private readonly tags: AccountListTag, // Nivel 3: Etiquetas para clasificar la cuenta (ej: "Proyecto A", "Centro de Costos")
    private readonly creationDate: CreatedAt, // nivel 1: Fecha de creación de la cuenta
  ) {
    super();
  }

  static create(data: AccountData): Account {
    const aggregate = new Account(data.id, data.name, data.type, data.currency, data.balance, data.financialEntity, data.number, data.tags, data.creationDate);
    aggregate.record(new AccountCreatedEvent(aggregate.toJson()));
    return aggregate;
  }

  toJson(): PrimitiveTypes<AccountData> {
    return {
      id: this.id.value,
      name: this.name.value,
      type: this.type.value,
      currency: this.currency.value,
      balance: this.balance.value,
      financialEntity: this.financialEntity.value,
      number: this.number.value,
      tags: this.tags.value,
      creationDate: this.creationDate.value,
    };
  }

  // Métodos de negocio
  addFunds(amount: number): void {
    if (this.type.isReal()) {
      this.balance = this.balance.addFunds(amount);
    } else {
      throw new DomainException('Cannot add funds to a virtual account');
    }
  }

  // Métodos de negocio
  // Nivel 1: Retirar fondos de la cuenta
  withdrawFunds(amount: number): void {
    if (this.type.isReal()) {
      this.balance = this.balance.withdrawFunds(amount);
    } else {
      throw new DomainException('Cannot withdraw funds from a virtual account');
    }
  }

  addTag(tag: string): void {
    this.tags.addItem(tag);
  }

  removeTag(tag: string): void {
    this.tags.removeItem(tag);
  }
}
