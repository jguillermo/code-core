/*
 * Propósito: Registra los movimientos financieros entre cuentas, como ingresos, gastos, transferencias internas y ajustes contables.
 * Este Aggregate asegura la trazabilidad de todas las operaciones financieras.
 * Uso: Este Aggregate asegura que las transacciones sean registradas de manera consistente
 * y puedan ser usadas para auditorías, reportes financieros, y análisis avanzados.
 */
export class Transaction {
  // Nivel 1: Identificador único de la transacción
  transactionId: string;

  // Nivel 1: Fecha en que ocurrió la transacción.
  transactionDate: Date;

  // Nivel 1: Identificador de las cuentas de origen (solo ID para evitar acoplamiento)
  fromAccountId: string;

  // Nivel 1:Identificador de las cuentas de destino. (solo ID para evitar acoplamiento)
  toAccountId: string;

  // Nivel 1: Monto transferido. (positivo para ingresos, negativo para egresos)
  amount: number;

  // Nivel 1: Descripción de la transacción
  description: string;

  // Nivel 2: Categoría de la transacción (opcional).
  category?: string;

  // Nivel 3: Etiquetas para clasificar transacciones (opcional).
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
