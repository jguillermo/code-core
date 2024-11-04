export class Transaction {
  // Nivel 1: Identificador único de la transacción
  transactionId: string;

  // Nivel 1: Fecha de la transacción
  transactionDate: Date;

  // Nivel 1: Cuenta de origen (solo ID para evitar acoplamiento)
  fromAccountId: string;

  // Nivel 1: Cuenta de destino (solo ID para evitar acoplamiento)
  toAccountId: string;

  // Nivel 1: Monto de la transacción
  amount: number;

  // Nivel 1: Descripción de la transacción
  description: string;

  // Nivel 2: Categoría de la transacción
  category?: string;

  // Nivel 3: Etiquetas adicionales
  tags?: string[];

  constructor(transactionId: string, transactionDate: Date, fromAccountId: string, toAccountId: string, amount: number, description: string, category?: string, tags?: string[]) {
    this.transactionId = transactionId;
    this.transactionDate = transactionDate;
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
    this.amount = amount;
    this.description = description;
    this.category = category;
    this.tags = tags || [];
  }
}
