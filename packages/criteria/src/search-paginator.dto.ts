export class SearchPaginatorDto {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
  ) {
    this.validate();
  }

  validate(): void {
    const pageNum = Number(this.page);
    const perPageNum = Number(this.perPage);
    if (!Number.isInteger(pageNum) || !Number.isInteger(perPageNum)) {
      throw new Error('SearchPaginatorDto: "page" and "perPage" must be integers');
    }
    if (pageNum < 1 || perPageNum < 1) {
      throw new Error('SearchPaginatorDto: "page" and "perPage" must be positive integers');
    }
  }
}
