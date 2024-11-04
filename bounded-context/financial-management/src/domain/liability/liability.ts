export class Liability {
  // Nivel 1: Identificador único del pasivo
  liabilityId: string;

  // Nivel 1: Descripción del pasivo
  description: string;

  // Nivel 1: Monto total del pasivo
  amount: number;

  // Nivel 1: Fecha de creación del pasivo
  creationDate: Date;

  // Nivel 2: Fecha de vencimiento del pasivo
  dueDate?: Date;

  // Nivel 2: Entidad acreedora asociada
  creditorEntity?: string;

  constructor(liabilityId: string, description: string, amount: number, creationDate: Date, dueDate?: Date, creditorEntity?: string) {
    this.liabilityId = liabilityId;
    this.description = description;
    this.amount = amount;
    this.creationDate = creationDate;
    this.dueDate = dueDate;
    this.creditorEntity = creditorEntity;
  }

  // Método para verificar si el pasivo está vencido
  isOverdue(): boolean {
    return this.dueDate ? new Date() > this.dueDate : false;
  }
}
