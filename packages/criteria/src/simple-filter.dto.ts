import { FilterOperator } from './filter-operator';

/**
 * DTO para un filtro simple.
 *
 * @param field - Nombre del campo.
 * @param operator - Operador de comparación.
 * @param value - Valor o arreglo de valores para comparar.
 */
export class SimpleFilterDto {
  constructor(
    public readonly field: string,
    public readonly operator: FilterOperator,
    public readonly value: string | number | (string | number)[],
  ) {}
}
