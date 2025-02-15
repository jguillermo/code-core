import { SearchPaginatorDto } from './search-paginator.dto';
import { SearchOrderDto } from './search-order.dto';
import { SearchFilterDto } from './search-filter.dto';

/**
 * DTO principal que engloba todos los criterios de búsqueda.
 *
 * @param filters - Filtro (simple o compuesto) para las condiciones.
 * @param orders - Arreglo de criterios de ordenamiento.
 * @param paginator - Configuración de paginación.
 * @param aggregates - (Opcional) Operaciones de agregación.
 * @param groupBy - (Opcional) Campos para agrupar los resultados.
 */
export class SearchQueryDto {
  constructor(
    public readonly filters?: SearchFilterDto,
    public readonly orders?: SearchOrderDto[],
    public readonly paginator?: SearchPaginatorDto,
    public readonly groupBy?: string[],
  ) {}
}
