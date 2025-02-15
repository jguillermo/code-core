import { SearchQueryDto } from './search-query.dto';
import { SearchOrderDto } from './search-order.dto';
import { SearchPaginatorDto } from './search-paginator.dto';
import { SearchFilterDto } from './search-filter.dto';
import { CompositeFilterDto } from './composite-filter.dto';
import { SimpleFilterDto } from './simple-filter.dto';

/**
 * Clase encargada de serializar y deserializar instancias de SearchQueryDto en un formato URL‑amigable.
 *
 * Formato:
 * - Filtros:
 *   - Filtro simple: S:<field>:<operator>:<value>
 *     (Si el valor es un array, se unen con comas)
 *   - Filtro compuesto: C:<logicalOperator>:(<filter1>|<filter2>|...|<filterN>)
 * - Órdenes:
 *   - O:<field>:<direction>,<field>:<direction>,...
 * - Paginador:
 *   - P:<page>,<perPage>
 * - Query completa: se unen secciones con '/'
 */
export class SearchQuerySerializer {
  public static serialize(query: SearchQueryDto): string {
    const parts: string[] = [];
    if (query.filters) {
      parts.push('F:' + this.serializeFilter(query.filters));
    }
    if (query.orders && query.orders.length > 0) {
      parts.push('O:' + this.serializeOrders(query.orders));
    }
    if (query.paginator) {
      parts.push('P:' + this.serializePaginator(query.paginator));
    }
    if (query.groupBy && query.groupBy.length > 0) {
      parts.push('G:' + query.groupBy.join(','));
    }
    return parts.join('/');
  }

  private static serializeFilter(filter: SearchFilterDto): string {
    if (filter instanceof SimpleFilterDto) {
      const valueStr = Array.isArray(filter.value) ? filter.value.join(',') : filter.value;
      return `S:${filter.field}:${filter.operator}:${valueStr}`;
    } else if (filter instanceof CompositeFilterDto) {
      const inner = filter.filters.map((f) => this.serializeFilter(f)).join('|');
      return `C:${filter.logicalOperator}:(${inner})`;
    }
    throw new Error('Tipo de filtro desconocido');
  }

  private static serializeOrders(orders: SearchOrderDto[]): string {
    return orders.map((o) => `${o.field}:${o.direction}`).join(',');
  }

  private static serializePaginator(paginator: SearchPaginatorDto): string {
    return `${paginator.page},${paginator.perPage}`;
  }

  public static deserialize(serialized: string): SearchQueryDto {
    const parts = serialized.split('/');
    let filters: SearchFilterDto | undefined;
    let orders: SearchOrderDto[] | undefined;
    let paginator: SearchPaginatorDto | undefined;
    let groupBy: string[] | undefined;

    for (const part of parts) {
      if (part.startsWith('F:')) {
        filters = this.deserializeFilter(part.substring(2));
      } else if (part.startsWith('O:')) {
        orders = this.deserializeOrders(part.substring(2));
      } else if (part.startsWith('P:')) {
        paginator = this.deserializePaginator(part.substring(2));
      } else if (part.startsWith('G:')) {
        groupBy = part.substring(2).split(',');
      }
    }
    return new SearchQueryDto(filters, orders, paginator, groupBy);
  }

  private static deserializeFilter(text: string): SearchFilterDto {
    if (text.startsWith('S:')) {
      // Formato: S:<field>:<operator>:<value>
      const parts = text.split(':');
      if (parts.length < 4) throw new Error('Formato de filtro simple inválido');
      const field = parts[1];
      const operator = parts[2];
      const valueStr = parts.slice(3).join(':'); // En caso de que el valor tenga ':'
      let value: string | number | (string | number)[];
      if (valueStr.indexOf(',') !== -1) {
        value = valueStr.split(',').map((v) => (isNaN(Number(v)) ? v : Number(v)));
      } else {
        value = isNaN(Number(valueStr)) ? valueStr : Number(valueStr);
      }
      return new SimpleFilterDto(field, operator as any, value);
    } else if (text.startsWith('C:')) {
      // Formato: C:<logicalOperator>:(<filter1>|<filter2>|...|<filterN>)
      const idx = text.indexOf(':(');
      if (idx === -1) throw new Error('Formato de filtro compuesto inválido');
      const logicalOperator = text.substring(2, idx);
      const innerText = text.substring(idx + 2, text.length - 1);
      const filterParts = this.splitByPipe(innerText);
      const filters = filterParts.map((fp) => this.deserializeFilter(fp));
      return new CompositeFilterDto(logicalOperator as any, filters);
    }
    throw new Error('Formato de filtro desconocido');
  }

  // Divide la cadena por '|' sin romper paréntesis anidados.
  private static splitByPipe(text: string): string[] {
    const result: string[] = [];
    let current = '';
    let depth = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '(') {
        depth++;
        current += char;
      } else if (char === ')') {
        depth--;
        current += char;
      } else if (char === '|' && depth === 0) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    if (current.length > 0) result.push(current);
    return result;
  }

  private static deserializeOrders(text: string): SearchOrderDto[] {
    if (!text) return [];
    return text.split(',').map((part) => {
      const [field, direction] = part.split(':');
      return new SearchOrderDto(field, direction as 'asc' | 'desc');
    });
  }

  private static deserializePaginator(text: string): SearchPaginatorDto {
    const [pageStr, perPageStr] = text.split(',');
    return new SearchPaginatorDto(Number(pageStr), Number(perPageStr));
  }
}
