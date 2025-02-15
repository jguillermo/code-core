export enum FilterOperator {
  EQ = 'eq', // Igual a
  NE = 'ne', // No igual a
  LT = 'lt', // Menor que
  LTE = 'lte', // Menor o igual que
  GT = 'gt', // Mayor que
  GTE = 'gte', // Mayor o igual que
  IN = 'in', // El valor se encuentra en un conjunto
  NIN = 'nin', // El valor NO se encuentra en un conjunto
  BETWEEN = 'between', // El valor está entre dos límites (se espera un array [min, max])
  LIKE = 'like', // Búsqueda de tipo LIKE (sensible a mayúsculas)
  ILIKE = 'ilike', // Búsqueda de tipo LIKE (insensible a mayúsculas)
  INARRAY = 'inarray', // Verifica si un valor se encuentra dentro de un array contenido en el campo
}
