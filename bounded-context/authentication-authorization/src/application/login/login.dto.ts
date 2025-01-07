export class LoginDto {
  constructor(
    public readonly method: string,
    public readonly credentials: Record<string, string>,
  ) {}
}
