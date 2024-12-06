/*
 * Gestiona los activos financieros o tangibles de la entidad,
 * como propiedades, vehículos, o inversiones.
 * Incluye funcionalidades para calcular depreciaciones y asociar costos adicionales.
 * Este Aggregate permite gestionar y evaluar el valor de los activos en los reportes financieros,
 * asegurando que los cálculos sean precisos y consistentes con las reglas del dominio.
 */
export class Asset {
  // Nivel 1: Identificador único del activo
  assetId: string;

  // Nivel 1: Nombre descriptivo del activo
  assetName: string;

  // Nivel 1: Fecha de adquisición del activo
  acquisitionDate: Date;

  // Nivel 1: Valor inicial del activo.
  acquisitionValue: number;

  // Nivel 2: Vida útil estimada en años.
  usefulLife: number;

  // Nivel 2: Método utilizado para calcular la depreciación (ej: "lineal", "saldoDecreciente")
  depreciationMethod: 'lineal' | 'saldoDecreciente';

  // Nivel 2: Valor estimado al final de la vida útil.
  residualValue: number;

  associatedCosts: number; // Costos relacionados como seguros o mantenimiento.

  // Nivel 3: Fecha de la última depreciación
  lastDepreciationDate?: Date;

  constructor(
    assetId: string,
    assetName: string,
    acquisitionDate: Date,
    acquisitionValue: number,
    usefulLife: number,
    depreciationMethod: 'lineal' | 'saldoDecreciente',
    residualValue: number,
    associatedCosts: number,
    lastDepreciationDate?: Date,
  ) {
    this.assetId = assetId;
    this.assetName = assetName;
    this.acquisitionDate = acquisitionDate;
    this.acquisitionValue = acquisitionValue;
    this.usefulLife = usefulLife;
    this.depreciationMethod = depreciationMethod;
    this.residualValue = residualValue;
    this.associatedCosts = associatedCosts;
    this.lastDepreciationDate = lastDepreciationDate;
  }

  /*
   * Calcula el monto anual de depreciación basado en el método y la vida útil.
   */
  calculateAnnualDepreciation(): number {
    return (this.acquisitionValue - this.residualValue) / this.usefulLife;
  }

  /*
   * Actualiza la información del activo con la última fecha de depreciación.
   */
  registerDepreciation(): void {
    this.lastDepreciationDate = new Date();
  }

  /*
   * Registra un costo relacionado con el activo.
   */
  addAssociatedCosts(cost: number): void {
    this.associatedCosts += cost;
  }
}
