/**
 * DTO para definir un ordenamiento individual.
 *
 * @param field - Campo sobre el que se aplicará el orden.
 * @param direction - 'asc' para ascendente o 'desc' para descendente.
 */
export class SearchOrderDto {
  constructor(
    public readonly field: string,
    public readonly direction: 'asc' | 'desc',
  ) {}
}
