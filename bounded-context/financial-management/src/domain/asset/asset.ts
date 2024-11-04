// src/domain/aggregates/asset/asset.ts

export class Asset {
  // Nivel 1: Identificador único del activo
  assetId: string;

  // Nivel 1: Nombre descriptivo del activo
  assetName: string;

  // Nivel 1: Fecha de adquisición del activo
  acquisitionDate: Date;

  // Nivel 1: Valor de adquisición del activo
  acquisitionValue: number;

  // Nivel 2: Vida útil estimada del activo
  usefulLife: number;

  // Nivel 2: Método de depreciación (ej: "lineal", "saldoDecreciente")
  depreciationMethod: 'lineal' | 'saldoDecreciente';

  // Nivel 2: Valor residual
  residualValue: number;

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
    lastDepreciationDate?: Date,
  ) {
    this.assetId = assetId;
    this.assetName = assetName;
    this.acquisitionDate = acquisitionDate;
    this.acquisitionValue = acquisitionValue;
    this.usefulLife = usefulLife;
    this.depreciationMethod = depreciationMethod;
    this.residualValue = residualValue;
    this.lastDepreciationDate = lastDepreciationDate;
  }

  calculateAnnualDepreciation(): number {
    return (this.acquisitionValue - this.residualValue) / this.usefulLife;
  }

  registerDepreciation(): void {
    this.lastDepreciationDate = new Date();
  }
}
