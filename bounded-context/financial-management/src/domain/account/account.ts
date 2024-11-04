export class Account {
  // Nivel 1: Identificador único de la cuenta
  accountId: string;

  // Nivel 1: Nombre descriptivo de la cuenta
  accountName: string;

  // Nivel 1: Tipo de cuenta (Real o Virtual)
  accountType: 'Real' | 'Virtual';

  // Nivel 1: Moneda en la que opera la cuenta
  currency: string;

  // Nivel 1: Saldo de la cuenta (Solo para cuentas reales)
  balance: number;

  // Nivel 2: Entidad financiera asociada (solo para cuentas bancarias o tarjetas de crédito)
  financialEntity?: string;

  // Nivel 2: Número de cuenta (solo para cuentas reales)
  accountNumber?: string;

  // Nivel 3: Etiquetas para clasificar la cuenta (ej: "Proyecto A", "Centro de Costos")
  tags?: string[];

  constructor(
    accountId: string,
    accountName: string,
    accountType: 'Real' | 'Virtual',
    currency: string,
    balance: number = 0,
    financialEntity?: string,
    accountNumber?: string,
    tags?: string[],
  ) {
    this.accountId = accountId;
    this.accountName = accountName;
    this.accountType = accountType;
    this.currency = currency;
    this.balance = balance;
    this.financialEntity = financialEntity;
    this.accountNumber = accountNumber;
    this.tags = tags || [];
  }

  // Métodos de negocio
  addFunds(amount: number): void {
    if (this.accountType === 'Real') {
      this.balance += amount;
    } else {
      throw new Error('Cannot add funds to a virtual account');
    }
  }

  withdrawFunds(amount: number): void {
    if (this.accountType === 'Real') {
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
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
  }
}
