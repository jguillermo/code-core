export class GenerateReportDto {
  constructor(
    public readonly totalAssets: number,
    public readonly totalLiabilities: number,
    public readonly equity: number,
  ) {}
}
