import { DomainException } from '@code-core/domain';

/*
 * Propósito: Maneja los pasivos financieros, como préstamos, cuentas por pagar, y obligaciones fiscales.
 * Este Aggregate asegura que los pasivos sean rastreados y gestionados correctamente.
 * Uso: Este Aggregate se utiliza para garantizar la trazabilidad y manejo adecuado de las obligaciones financieras,
 * así como para calcular métricas clave en los reportes.
 */
export class Liability {
  // Nivel 1: Identificador único del pasivo
  liabilityId: string;

  // Nivel 1: Descripción del pasivo
  description: string;

  // Nivel 1: Monto total del pasivo
  amount: number;

  // Nivel 1: Fecha en que se registró el pasivo.
  creationDate: Date;

  // Nivel 2: Fecha de vencimiento (opcional).
  dueDate?: Date;

  // Nivel 2: Información sobre el acreedor (opcional).
  creditorEntity?: string;

  constructor(liabilityId: string, description: string, amount: number, creationDate: Date, dueDate?: Date, creditorEntity?: string) {
    this.liabilityId = liabilityId;
    this.description = description;
    this.amount = amount;
    this.creationDate = creationDate;
    this.dueDate = dueDate;
    this.creditorEntity = creditorEntity;
  }

  /*
   * Verifica si el pasivo está vencido.
   */
  isOverdue(): boolean {
    return this.dueDate ? new Date() > this.dueDate : false;
  }

  /*
   * Registra un pago parcial o total del pasivo.
   */
  recordPayment(paymentAmount: number): void {
    if (paymentAmount > this.amount) {
      throw new DomainException('Payment amount exceeds the total liability amount');
    }
    this.amount -= paymentAmount;
  }

  /*
   * Verifica si el pasivo ha sido liquidado en su totalidad.
   */
  isFullyPaid(): boolean {
    return this.amount === 0;
  }
}
