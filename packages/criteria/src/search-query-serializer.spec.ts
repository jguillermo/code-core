// search-query-serializer.spec.ts

import { SearchQueryDto } from './search-query.dto';
import { SearchOrderDto } from './search-order.dto';
import { SearchPaginatorDto } from './search-paginator.dto';
import { CompositeFilterDto } from './composite-filter.dto';
import { SimpleFilterDto } from './simple-filter.dto';
import { SearchQuerySerializer } from './search-query-serializer';
import { FilterOperator } from './filter-operator';

describe('SearchQuerySerializer', () => {
  describe('Basic Sections', () => {
    it('should serialize and deserialize a query with only a simple filter', () => {
      const query = new SearchQueryDto(new SimpleFilterDto('name', FilterOperator.EQ, 'Alice'));
      const serialized = SearchQuerySerializer.serialize(query);
      const expectedObj = {
        filters: {
          type: 'simple',
          field: 'name',
          operator: FilterOperator.EQ,
          value: 'Alice',
        },
        orders: null,
        paginator: null,
        groupBy: null,
      };
      expect(JSON.parse(serialized)).toEqual(expectedObj);

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      const filter = deserialized.filters as SimpleFilterDto;
      expect(filter.field).toBe('name');
      expect(filter.operator).toBe(FilterOperator.EQ);
      expect(filter.value).toBe('Alice');
    });

    it('should serialize and deserialize a query with only orders', () => {
      const orders = [new SearchOrderDto('age', 'desc'), new SearchOrderDto('name', 'asc')];
      const query = new SearchQueryDto(undefined, orders);
      const serialized = SearchQuerySerializer.serialize(query);
      const expectedObj = {
        filters: null,
        orders: orders.map((o) => ({ field: o.field, direction: o.direction })),
        paginator: null,
        groupBy: null,
      };
      expect(JSON.parse(serialized)).toEqual(expectedObj);

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      expect(deserialized.orders).toHaveLength(2);
      expect(deserialized.orders![0].field).toBe('age');
      expect(deserialized.orders![0].direction).toBe('desc');
      expect(deserialized.orders![1].field).toBe('name');
      expect(deserialized.orders![1].direction).toBe('asc');
    });

    it('should serialize and deserialize a query with only paginator', () => {
      const paginator = new SearchPaginatorDto(3, 25);
      const query = new SearchQueryDto(undefined, undefined, paginator);
      const serialized = SearchQuerySerializer.serialize(query);
      const expectedObj = {
        filters: null,
        orders: null,
        paginator: { page: 3, perPage: 25 },
        groupBy: null,
      };
      expect(JSON.parse(serialized)).toEqual(expectedObj);

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      expect(deserialized.paginator?.page).toBe(3);
      expect(deserialized.paginator?.perPage).toBe(25);
    });

    it('should serialize and deserialize a query with only groupBy', () => {
      const groupBy = ['department', 'role'];
      const query = new SearchQueryDto(undefined, undefined, undefined, groupBy);
      const serialized = SearchQuerySerializer.serialize(query);
      const expectedObj = {
        filters: null,
        orders: null,
        paginator: null,
        groupBy: groupBy,
      };
      expect(JSON.parse(serialized)).toEqual(expectedObj);

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      expect(deserialized.groupBy).toEqual(['department', 'role']);
    });
  });

  describe('Combined Sections', () => {
    it('should serialize and deserialize a query with filters, orders, paginator, and groupBy', () => {
      const filter = new SimpleFilterDto('age', FilterOperator.GT, 30);
      const orders = [new SearchOrderDto('age', 'desc')];
      const paginator = new SearchPaginatorDto(2, 20);
      const groupBy = ['department'];
      const query = new SearchQueryDto(filter, orders, paginator, groupBy);

      const serialized = SearchQuerySerializer.serialize(query);
      const expectedObj = {
        filters: {
          type: 'simple',
          field: 'age',
          operator: FilterOperator.GT,
          value: 30,
        },
        orders: [{ field: 'age', direction: 'desc' }],
        paginator: { page: 2, perPage: 20 },
        groupBy: ['department'],
      };
      expect(JSON.parse(serialized)).toEqual(expectedObj);

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      const desFilter = deserialized.filters as SimpleFilterDto;
      expect(desFilter.field).toBe('age');
      expect(desFilter.operator).toBe(FilterOperator.GT);
      expect(desFilter.value).toBe(30);
      expect(deserialized.orders).toHaveLength(1);
      expect(deserialized.paginator?.page).toBe(2);
      expect(deserialized.groupBy).toEqual(['department']);
    });
  });

  describe('Advanced Filters', () => {
    it('should serialize and deserialize a composite filter with nested composite and simple filters', () => {
      // Construct a composite filter:
      // ((name eq "Alice" OR name eq "Bob") AND age gt 20 AND roles inarray admin)
      const compositeFilter = new CompositeFilterDto('and', [
        new CompositeFilterDto('or', [new SimpleFilterDto('name', FilterOperator.EQ, 'Alice'), new SimpleFilterDto('name', FilterOperator.EQ, 'Bob')]),
        new SimpleFilterDto('age', FilterOperator.GT, 20),
        new SimpleFilterDto('roles', FilterOperator.INARRAY, 'admin'),
      ]);
      const query = new SearchQueryDto(compositeFilter);
      const serialized = SearchQuerySerializer.serialize(query);
      const expectedObj = {
        filters: {
          type: 'composite',
          logicalOperator: 'and',
          filters: [
            {
              type: 'composite',
              logicalOperator: 'or',
              filters: [
                { type: 'simple', field: 'name', operator: FilterOperator.EQ, value: 'Alice' },
                { type: 'simple', field: 'name', operator: FilterOperator.EQ, value: 'Bob' },
              ],
            },
            { type: 'simple', field: 'age', operator: FilterOperator.GT, value: 20 },
            { type: 'simple', field: 'roles', operator: FilterOperator.INARRAY, value: 'admin' },
          ],
        },
        orders: null,
        paginator: null,
        groupBy: null,
      };
      expect(JSON.parse(serialized)).toEqual(expectedObj);

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      const compFilter = deserialized.filters as CompositeFilterDto;
      expect(compFilter.logicalOperator).toBe('and');
      expect(compFilter.filters).toHaveLength(3);

      // Verify the nested OR composite filter
      const orFilter = compFilter.filters[0] as CompositeFilterDto;
      expect(orFilter.logicalOperator).toBe('or');
      expect(orFilter.filters).toHaveLength(2);
      const simpleNameFilter = orFilter.filters[0] as SimpleFilterDto;
      expect(simpleNameFilter.field).toBe('name');
      expect(simpleNameFilter.operator).toBe(FilterOperator.EQ);
      expect(simpleNameFilter.value).toBe('Alice');

      // Verify the other simple filters
      const ageFilter = compFilter.filters[1] as SimpleFilterDto;
      expect(ageFilter.field).toBe('age');
      expect(ageFilter.operator).toBe(FilterOperator.GT);
      expect(ageFilter.value).toBe(20);

      const rolesFilter = compFilter.filters[2] as SimpleFilterDto;
      expect(rolesFilter.field).toBe('roles');
      expect(rolesFilter.operator).toBe(FilterOperator.INARRAY);
      expect(rolesFilter.value).toBe('admin');
    });

    it('should serialize and deserialize a filter with an array value', () => {
      // A simple filter where the value is an array
      const query = new SearchQueryDto(new SimpleFilterDto('id', FilterOperator.IN, [1, 2, 3]));
      const serialized = SearchQuerySerializer.serialize(query);
      const expectedObj = {
        filters: {
          type: 'simple',
          field: 'id',
          operator: FilterOperator.IN,
          value: [1, 2, 3],
        },
        orders: null,
        paginator: null,
        groupBy: null,
      };
      expect(JSON.parse(serialized)).toEqual(expectedObj);

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      const filter = deserialized.filters as SimpleFilterDto;
      expect(filter.field).toBe('id');
      expect(filter.operator).toBe(FilterOperator.IN);
      expect(filter.value).toEqual([1, 2, 3]);
    });

    it('should perform a round-trip for a complex query with multiple nested filters', () => {
      // Complex nested filter scenario:
      // ((status eq "active" OR status eq "pending") AND (score gt 50 OR (score eq 100 AND bonus gt 10)))
      const nestedFilter = new CompositeFilterDto('and', [
        new CompositeFilterDto('or', [new SimpleFilterDto('status', FilterOperator.EQ, 'active'), new SimpleFilterDto('status', FilterOperator.EQ, 'pending')]),
        new CompositeFilterDto('or', [
          new SimpleFilterDto('score', FilterOperator.GT, 50),
          new CompositeFilterDto('and', [new SimpleFilterDto('score', FilterOperator.EQ, 100), new SimpleFilterDto('bonus', FilterOperator.GT, 10)]),
        ]),
      ]);
      const orders = [new SearchOrderDto('updatedAt', 'desc')];
      const paginator = new SearchPaginatorDto(1, 50);
      const groupBy = ['category', 'region'];
      const query = new SearchQueryDto(nestedFilter, orders, paginator, groupBy);

      const serialized = SearchQuerySerializer.serialize(query);
      const deserialized = SearchQuerySerializer.deserialize(serialized);
      const reserialized = SearchQuerySerializer.serialize(deserialized);

      // The round-trip serialization should remain consistent.
      expect(reserialized).toBe(serialized);
    });
  });

  describe('Error and Invalid Values', () => {
    // Invalid Pagination Tests
    it('should throw an error when pagination values are non-numeric', () => {
      const invalidPaginationJSON = JSON.stringify({
        filters: null,
        orders: null,
        paginator: { page: 'two', perPage: 'twenty' },
        groupBy: null,
      });
      expect(() => SearchQuerySerializer.deserialize(invalidPaginationJSON)).toThrow();
    });

    it('should throw an error when pagination values are negative', () => {
      const negativePaginationJSON = JSON.stringify({
        filters: null,
        orders: null,
        paginator: { page: -1, perPage: -10 },
        groupBy: null,
      });
      // Depending on implementation, negative values might be allowed.
      // If they are not allowed, you can expect an error.
      expect(() => SearchQuerySerializer.deserialize(negativePaginationJSON)).toThrow();
    });

    // Invalid Order Tests
    it('should throw an error when order direction is invalid (not "asc" or "desc")', () => {
      const invalidOrderJSON = JSON.stringify({
        filters: null,
        orders: [{ field: 'name', direction: 'upward' }],
        paginator: null,
        groupBy: null,
      });
      expect(() => SearchQuerySerializer.deserialize(invalidOrderJSON)).toThrow();
    });

    it('should throw an error when order object is missing the "direction" property', () => {
      const missingDirectionOrderJSON = JSON.stringify({
        filters: null,
        orders: [{ field: 'name' }], // Missing direction
        paginator: null,
        groupBy: null,
      });
      expect(() => SearchQuerySerializer.deserialize(missingDirectionOrderJSON)).toThrow();
    });

    // Invalid Filter Tests
    it('should throw an error when a simple filter is missing the "field" property', () => {
      const missingFieldFilterJSON = JSON.stringify({
        filters: {
          type: 'simple',
          operator: 'eq',
          value: 'test',
        },
        orders: null,
        paginator: null,
        groupBy: null,
      });
      expect(() => SearchQuerySerializer.deserialize(missingFieldFilterJSON)).toThrow();
    });

    it('should throw an error when a simple filter is missing the "operator" property', () => {
      const missingOperatorFilterJSON = JSON.stringify({
        filters: {
          type: 'simple',
          field: 'price',
          value: 100,
        },
        orders: null,
        paginator: null,
        groupBy: null,
      });
      expect(() => SearchQuerySerializer.deserialize(missingOperatorFilterJSON)).toThrow();
    });

    it('should throw an error when a simple filter is missing the "value" property', () => {
      const missingValueFilterJSON = JSON.stringify({
        filters: {
          type: 'simple',
          field: 'quantity',
          operator: 'eq',
          // "value" property is missing
        },
        orders: null,
        paginator: null,
        groupBy: null,
      });
      expect(() => SearchQuerySerializer.deserialize(missingValueFilterJSON)).toThrow();
    });

    it('should throw an error when a filter has an unknown type', () => {
      const unknownFilterTypeJSON = JSON.stringify({
        filters: {
          type: 'mystery',
          field: 'unknown',
          operator: 'eq',
          value: '???',
        },
        orders: null,
        paginator: null,
        groupBy: null,
      });
      expect(() => SearchQuerySerializer.deserialize(unknownFilterTypeJSON)).toThrow();
    });

    it('should throw an error when a composite filter has a non-array "filters" property', () => {
      const invalidCompositeFilterJSON = JSON.stringify({
        filters: {
          type: 'composite',
          logicalOperator: 'and',
          filters: 'not_an_array',
        },
        orders: null,
        paginator: null,
        groupBy: null,
      });
      expect(() => SearchQuerySerializer.deserialize(invalidCompositeFilterJSON)).toThrow();
    });

    // Invalid JSON Test
    it('should throw an error when provided with an invalid JSON string', () => {
      const invalidJSONString = 'This is not JSON!';
      expect(() => SearchQuerySerializer.deserialize(invalidJSONString)).toThrow();
    });

    // GroupBy Tests
    it('should throw an error when groupBy is not an array', () => {
      const invalidGroupByJSON = JSON.stringify({
        filters: null,
        orders: null,
        paginator: null,
        groupBy: 'department', // Should be an array, e.g. ["department"]
      });
      expect(() => SearchQuerySerializer.deserialize(invalidGroupByJSON)).toThrow();
    });

    // Additional test: Numeric filter value provided as a string that cannot be coerced
    it('should throw an error when a numeric filter value is not a valid number', () => {
      const invalidNumericFilterJSON = JSON.stringify({
        filters: {
          type: 'simple',
          field: 'price',
          operator: 'gt',
          value: 'one_hundred', // invalid numeric string
        },
        orders: null,
        paginator: null,
        groupBy: null,
      });
      // If the implementation tries to coerce this and fails, an error should be thrown.
      expect(() => SearchQuerySerializer.deserialize(invalidNumericFilterJSON)).toThrow();
    });
  });
});
