/**
 * DTO para definir la paginación de la consulta.
 *
 * @param page - Número de página (empezando en 1).
 * @param perPage - Cantidad de elementos por página.
 */
export class SearchPaginatorDto {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
  ) {}
}
