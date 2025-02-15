import { LogicalOperator } from './logical-operator';
import { SearchFilterDto } from './search-filter.dto';

/**
 * DTO para construir filtros compuestos.
 *
 * @param logicalOperator - Operador lógico para combinar (and/or).
 * @param filters - Arreglo de filtros (simples o compuestos).
 */
export class CompositeFilterDto {
  constructor(
    public readonly logicalOperator: LogicalOperator,
    public readonly filters: SearchFilterDto[],
  ) {}
}
