// search-query-serializer.spec.ts

import { SearchQueryDto } from './search-query.dto';
import { SearchOrderDto } from './search-order.dto';
import { SearchPaginatorDto } from './search-paginator.dto';
import { CompositeFilterDto } from './composite-filter.dto';
import { SimpleFilterDto } from './simple-filter.dto';
import { SearchQuerySerializer } from './search-query-serializer';
import { FilterOperator } from './filter-operator';

describe('SearchQuerySerializer', () => {
  describe('serialize', () => {
    it('should serialize a basic query with a simple filter', () => {
      // Filtro simple: name eq "Alice"
      const query = new SearchQueryDto(new SimpleFilterDto('name', FilterOperator.EQ, 'Alice'));
      const serialized = SearchQuerySerializer.serialize(query);
      const expected = 'F:S:name:eq:Alice';
      expect(serialized).toBe(expected);
    });

    it('should serialize a query with orders, paginator and groupBy', () => {
      // Filtro simple: age gt 30, orden y paginación, además groupBy
      const query = new SearchQueryDto(new SimpleFilterDto('age', FilterOperator.GT, 30), [new SearchOrderDto('age', 'desc')], new SearchPaginatorDto(2, 20), [
        'department',
        'role',
      ]);
      const serialized = SearchQuerySerializer.serialize(query);
      const expected = 'F:S:age:gt:30/O:age:desc/P:2,20/G:department,role';
      expect(serialized).toBe(expected);
    });

    it('should serialize a complex query with composite filters', () => {
      // Filtros compuestos:
      // ( (name eq "Alice" OR name eq "Bob") AND age gt 20 AND roles inarray admin )
      const compositeFilter = new CompositeFilterDto('and', [
        new CompositeFilterDto('or', [new SimpleFilterDto('name', FilterOperator.EQ, 'Alice'), new SimpleFilterDto('name', FilterOperator.EQ, 'Bob')]),
        new SimpleFilterDto('age', FilterOperator.GT, 20),
        new SimpleFilterDto('roles', FilterOperator.INARRAY, 'admin'),
      ]);
      const query = new SearchQueryDto(compositeFilter, [new SearchOrderDto('age', 'desc'), new SearchOrderDto('name', 'asc')], new SearchPaginatorDto(1, 10), ['department']);
      const serialized = SearchQuerySerializer.serialize(query);
      const expected = 'F:C:and:(C:or:(S:name:eq:Alice|S:name:eq:Bob)|S:age:gt:20|S:roles:inarray:admin)/O:age:desc,name:asc/P:1,10/G:department';
      expect(serialized).toBe(expected);
    });

    it('should serialize filter values with special characters', () => {
      // Un valor que contiene ":" y "|" para probar que se serializa tal cual
      const query = new SearchQueryDto(new SimpleFilterDto('description', FilterOperator.LIKE, 'hello:world|test'));
      const serialized = SearchQuerySerializer.serialize(query);
      const expected = 'F:S:description:like:hello:world|test';
      expect(serialized).toBe(expected);
    });

    it('should be consistent in round-trip serialization', () => {
      const originalQuery = new SearchQueryDto(
        new CompositeFilterDto('or', [new SimpleFilterDto('status', FilterOperator.EQ, 'active'), new SimpleFilterDto('status', FilterOperator.EQ, 'pending')]),
        [new SearchOrderDto('createdAt', 'desc')],
        new SearchPaginatorDto(3, 15),
        ['category'],
      );
      const serialized = SearchQuerySerializer.serialize(originalQuery);
      const deserialized = SearchQuerySerializer.deserialize(serialized);
      const reserialized = SearchQuerySerializer.serialize(deserialized);
      expect(reserialized).toBe(serialized);
    });
  });

  describe('deserialize', () => {
    it('should deserialize a basic query and reconstruct the simple filter', () => {
      const spec = 'F:S:name:eq:Alice';
      const query = SearchQuerySerializer.deserialize(spec);
      expect(query.filters).toBeDefined();
      const filter = query.filters as SimpleFilterDto;
      expect(filter.field).toBe('name');
      expect(filter.operator).toBe(FilterOperator.EQ);
      expect(filter.value).toBe('Alice');
    });

    it('should deserialize a query with orders, paginator and groupBy', () => {
      const spec = 'F:S:age:gt:30/O:age:desc/P:2,20/G:department,role';
      const query = SearchQuerySerializer.deserialize(spec);
      const filter = query.filters as SimpleFilterDto;
      expect(filter.field).toBe('age');
      expect(filter.operator).toBe('gt');
      expect(filter.value).toBe(30);
      expect(query.orders).toHaveLength(1);
      expect(query.orders![0].field).toBe('age');
      expect(query.orders![0].direction).toBe('desc');
      expect(query.paginator?.page).toBe(2);
      expect(query.paginator?.perPage).toBe(20);
      expect(query.groupBy).toEqual(['department', 'role']);
    });

    it('should deserialize a complex query with composite filters', () => {
      const spec = 'F:C:and:(C:or:(S:name:eq:Alice|S:name:eq:Bob)|S:age:gt:20|S:roles:inarray:admin)/O:age:desc,name:asc/P:1,10/G:department';
      const query = SearchQuerySerializer.deserialize(spec);
      // Verificar filtro compuesto principal
      const composite = query.filters as CompositeFilterDto;
      expect(composite.logicalOperator).toBe('and');
      expect(composite.filters).toHaveLength(3);

      // Primer subfiltro: composite OR
      const orComposite = composite.filters[0] as CompositeFilterDto;
      expect(orComposite.logicalOperator).toBe('or');
      expect(orComposite.filters).toHaveLength(2);
      const filter1 = orComposite.filters[0] as SimpleFilterDto;
      expect(filter1.field).toBe('name');
      expect(filter1.operator).toBe(FilterOperator.EQ);
      expect(filter1.value).toBe('Alice');

      // Verificar órdenes, paginador y groupBy
      expect(query.orders).toHaveLength(2);
      expect(query.orders![0].field).toBe('age');
      expect(query.orders![0].direction).toBe('desc');
      expect(query.orders![1].field).toBe('name');
      expect(query.orders![1].direction).toBe('asc');
      expect(query.paginator?.page).toBe(1);
      expect(query.paginator?.perPage).toBe(10);
      expect(query.groupBy).toEqual(['department']);
    });

    it('should perform round-trip deserialization and serialization for a given spec string', () => {
      const spec = 'F:C:or:(S:status:eq:active|S:status:eq:pending)/O:createdAt:desc/P:3,15/G:category';
      const deserializedQuery = SearchQuerySerializer.deserialize(spec);
      const reserializedSpec = SearchQuerySerializer.serialize(deserializedQuery);
      expect(reserializedSpec).toBe(spec);
    });
  });

  // Additional tests in search-query-serializer.spec.ts

  describe.skip('SearchQuerySerializer - Special Characters', () => {
    it('should correctly serialize and deserialize filter values with accented characters', () => {
      // Create a query with accented characters in the field value
      const query = new SearchQueryDto(new SimpleFilterDto('nombre', FilterOperator.EQ, 'José, María ñáéíóúü'));
      const serialized = SearchQuerySerializer.serialize(query);
      // Expect the serialized string to contain the accented characters as-is.
      expect(serialized).toEqual('F:S:nombre:eq:José, María ñáéíóúü');

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      const filter = deserialized.filters as SimpleFilterDto;
      expect(filter.field).toBe('nombre');
      expect(filter.value).toBe('José, María ñáéíóúü');
    });

    it('should correctly handle filter values containing reserved substrings such as "S:" and pipes', () => {
      // Create a query where the filter value includes reserved substrings like "S:" and "|"
      const query = new SearchQueryDto(new SimpleFilterDto('note', FilterOperator.LIKE, 'This is a test with S: and | inside'));
      const serialized = SearchQuerySerializer.serialize(query);
      // Expect the serialized string to include the reserved sequences unmodified
      expect(serialized).toContain('This is a test with S: and | inside');

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      const filter = deserialized.filters as SimpleFilterDto;
      expect(filter.field).toBe('note');
      expect(filter.value).toBe('This is a test with S: and | inside');
    });

    it('should correctly serialize and deserialize composite filters with special characters in nested values', () => {
      // Create a composite filter with inner simple filters containing reserved characters.
      const compositeFilter = new CompositeFilterDto('and', [
        new CompositeFilterDto('or', [
          new SimpleFilterDto('title', FilterOperator.LIKE, 'Introduction: Part 1'),
          new SimpleFilterDto('title', FilterOperator.LIKE, 'Conclusion | Final Thoughts'),
        ]),
        new SimpleFilterDto('description', FilterOperator.LIKE, 'Contains S: and multiple, commas'),
      ]);
      const query = new SearchQueryDto(compositeFilter, [new SearchOrderDto('createdAt', 'asc')], new SearchPaginatorDto(1, 5), ['section']);
      const serialized = SearchQuerySerializer.serialize(query);
      // Check that special characters remain intact in the serialized string.
      expect(serialized).toContain('Introduction: Part 1');
      expect(serialized).toContain('Conclusion | Final Thoughts');
      expect(serialized).toContain('Contains S: and multiple, commas');

      const deserialized = SearchQuerySerializer.deserialize(serialized);
      // Verify nested composite filter values
      const compFilter = deserialized.filters as CompositeFilterDto;
      const innerOr = compFilter.filters[0] as CompositeFilterDto;
      const firstSimple = innerOr.filters[0] as SimpleFilterDto;
      const secondSimple = innerOr.filters[1] as SimpleFilterDto;
      expect(firstSimple.value).toBe('Introduction: Part 1');
      expect(secondSimple.value).toBe('Conclusion | Final Thoughts');

      const descriptionFilter = compFilter.filters[1] as SimpleFilterDto;
      expect(descriptionFilter.value).toBe('Contains S: and multiple, commas');
    });
  });
});
