import { SearchQueryDto } from './search-query.dto';
import { SearchOrderDto } from './search-order.dto';
import { SearchPaginatorDto } from './search-paginator.dto';
import { SearchFilterDto } from './search-filter.dto';
import { CompositeFilterDto } from './composite-filter.dto';
import { SimpleFilterDto } from './simple-filter.dto';
import { FilterOperator } from './filter-operator';

/**
 * Class responsible for serializing and deserializing SearchQueryDto instances
 * into a custom JSON object.
 *
 * The JSON format:
 * {
 *   "filters": <custom filters object>,
 *   "orders": <array of orders>,
 *   "paginator": <paginator object>,
 *   "groupBy": <array of groupBy fields>
 * }
 */
export class SearchQuerySerializer {
  /**
   * Serializes a SearchQueryDto instance into a JSON string.
   * @param query An instance of SearchQueryDto.
   * @returns A JSON string representing the query.
   */
  public static serialize(query: SearchQueryDto): string {
    const obj: any = {};
    obj.filters = query.filters ? this.serializeFilter(query.filters) : null;
    obj.orders = query.orders ? query.orders.map((o) => ({ field: o.field, direction: o.direction })) : null;
    obj.paginator = query.paginator ? { page: query.paginator.page, perPage: query.paginator.perPage } : null;
    obj.groupBy = query.groupBy || null;
    return JSON.stringify(obj);
  }

  /**
   * Deserializes a JSON string (in the custom format) back into a SearchQueryDto instance.
   * @param serialized The JSON string.
   * @returns The reconstructed SearchQueryDto instance.
   */
  public static deserialize(serialized: string): SearchQueryDto {
    let obj: any;
    try {
      obj = JSON.parse(serialized);
    } catch (error) {
      throw new Error('Invalid JSON string');
    }
    // Validate orders
    if (obj.orders !== null && !Array.isArray(obj.orders)) {
      throw new Error('Orders must be an array');
    }
    if (obj.orders) {
      obj.orders.forEach((o: any) => {
        if (typeof o.field !== 'string') {
          throw new Error('Order field must be a string');
        }
        if (o.direction !== 'asc' && o.direction !== 'desc') {
          throw new Error('Order direction must be either "asc" or "desc"');
        }
      });
    }
    // Validate paginator
    if (obj.paginator !== null) {
      if (typeof obj.paginator.page !== 'number' || typeof obj.paginator.perPage !== 'number') {
        throw new Error('Paginator values must be numbers');
      }
      // Optionally check for positive values
      if (obj.paginator.page < 0 || obj.paginator.perPage < 0) {
        throw new Error('Paginator values must be non-negative');
      }
    }
    // Validate groupBy
    if (obj.groupBy !== null && !Array.isArray(obj.groupBy)) {
      throw new Error('groupBy must be an array');
    }
    const filters = obj.filters ? this.deserializeFilter(obj.filters) : undefined;
    const orders = obj.orders ? obj.orders.map((o: any) => new SearchOrderDto(o.field, o.direction)) : undefined;
    const paginator = obj.paginator ? new SearchPaginatorDto(obj.paginator.page, obj.paginator.perPage) : undefined;
    const groupBy = Array.isArray(obj.groupBy) ? obj.groupBy : undefined;
    return new SearchQueryDto(filters, orders, paginator, groupBy);
  }

  // Helper method to serialize a SearchFilterDto into a custom object.
  private static serializeFilter(filter: SearchFilterDto): any {
    if (filter instanceof SimpleFilterDto) {
      // Validate that required properties exist
      if (!filter.field || !filter.operator || filter.value === undefined) {
        throw new Error('Simple filter is missing required properties');
      }
      return {
        type: 'simple',
        field: filter.field,
        operator: filter.operator,
        value: filter.value,
      };
    } else if (filter instanceof CompositeFilterDto) {
      if (!filter.logicalOperator || !Array.isArray(filter.filters)) {
        throw new Error('Composite filter is missing required properties or filters is not an array');
      }
      return {
        type: 'composite',
        logicalOperator: filter.logicalOperator,
        filters: filter.filters.map((f) => this.serializeFilter(f)),
      };
    }
    throw new Error('Unknown filter type');
  }

  // Helper method to deserialize a filter object back into a SearchFilterDto.
  private static deserializeFilter(obj: any): SearchFilterDto {
    if (obj.type === 'simple') {
      if (typeof obj.field !== 'string') {
        throw new Error('Simple filter "field" must be a string');
      }
      if (typeof obj.operator !== 'string') {
        throw new Error('Simple filter "operator" must be a string');
      }
      if (!Object.prototype.hasOwnProperty.call(obj, 'value')) {
        throw new Error('Simple filter is missing "value"');
      }
      // Validate that obj.operator is one of the allowed values.
      if (!Object.values(FilterOperator).includes(obj.operator)) {
        throw new Error(`Unknown operator "${obj.operator}" in simple filter`);
      }
      // List of operators that require numeric values.
      const numericOperators = [FilterOperator.LT, FilterOperator.LTE, FilterOperator.GT, FilterOperator.GTE, FilterOperator.BETWEEN];
      let value: any = obj.value;
      if (numericOperators.includes(obj.operator)) {
        if (Array.isArray(value)) {
          value = value.map((v) => {
            const num = Number(v);
            if (isNaN(num)) {
              throw new Error(`Invalid numeric value in array: ${v}`);
            }
            return num;
          });
        } else {
          const num = Number(value);
          if (isNaN(num)) {
            throw new Error(`Invalid numeric value: ${value}`);
          }
          value = num;
        }
      }
      return new SimpleFilterDto(obj.field, obj.operator, value);
    } else if (obj.type === 'composite') {
      if (typeof obj.logicalOperator !== 'string') {
        throw new Error('Composite filter "logicalOperator" must be a string');
      }
      if (!Array.isArray(obj.filters)) {
        throw new Error('Composite filter "filters" must be an array');
      }
      const subFilters = obj.filters.map((sub: any) => this.deserializeFilter(sub));
      return new CompositeFilterDto(obj.logicalOperator, subFilters);
    }
    throw new Error('Unknown filter format');
  }
}
