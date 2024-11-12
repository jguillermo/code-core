import { AccountId } from './types/account-id';
import { AggregateRoot, ArrayType, CreatedAt, DomainException, MutablePropertiesData, PrimitiveTypes, PropertiesData } from '@code-core/domain';
import { AccountName } from './types/account-name';
import { AccountType } from './types/account-type';
import { AccountData } from './account.data';
import { AccountCurrency } from './types/account-currency';
import { AccountBalance } from './types/account-balance';
import { AccountFinantialEntity } from './types/account-finantial-entity';
import { AccountAccountNumber } from './types/account-account-number';
import { AccountTag } from './types/account-tag';
import { AccountCreatedEvent } from './events/account-created.event';

export class Account extends AggregateRoot {
  private readonly id: AccountId; // Nivel 1: Identificador único de la cuenta
  private readonly name: AccountName; // Nivel 1: Nombre descriptivo de la cuenta
  private readonly type: AccountType; // Nivel 1: Tipo de cuenta (Real o Virtual)
  private readonly currency: AccountCurrency; // Nivel 1: Moneda en la que opera la cuenta
  private balance: AccountBalance; // Nivel 1: Saldo de la cuenta (Solo para cuentas reales)
  private readonly financialEntity: AccountFinantialEntity; // Nivel 2: Entidad financiera asociada (solo para cuentas bancarias o tarjetas de crédito)
  private readonly number: AccountAccountNumber; // Nivel 2: Número de cuenta (solo para cuentas reales)
  private tags: AccountTag[]; // Nivel 3: Etiquetas para clasificar la cuenta (ej: "Proyecto A", "Centro de Costos")
  private readonly creationDate: CreatedAt;

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
    this.creationDate = data.creationDate;
  }

  static create(level: number, data: AccountData): Account {
    const dataAggregate: MutablePropertiesData<AccountData> = {
      id: data.requireId(),
      name: data.requireName(),
      type: data.requireType(),
      currency: data.requireCurrency(),
      balance: data.requireBalance(),
      financialEntity: data.financialEntity ?? AccountFinantialEntity.empty(),
      number: data.number ?? AccountAccountNumber.empty(),
      tags: data.tags ?? [],
      creationDate: CreatedAt.now(),
    };

    switch (true) {
      case level >= 2:
        dataAggregate.financialEntity = data.requireFinancialEntity();
        dataAggregate.number = data.requireNumber();
        break;
      case level >= 3:
        dataAggregate.tags = data.tags ?? [];
        break;
    }

    const aggregate = new Account(dataAggregate);
    aggregate.record(new AccountCreatedEvent(aggregate.toJson()));
    return aggregate;
  }

  toJson(): Required<PrimitiveTypes<AccountData>> {
    return {
      id: this.id.value,
      name: this.name.value,
      type: this.type.value,
      currency: this.currency.value,
      balance: this.balance.value,
      financialEntity: this.financialEntity.value,
      number: this.number.value,
      tags: this.tags.map((tag) => tag.value),
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
    ArrayType.addValue<AccountTag>(this.tags, new AccountTag(tag));
  }

  removeTag(tag: string): void {
    this.tags = ArrayType.removeValue<AccountTag>(this.tags, new AccountTag(tag));
  }
}
