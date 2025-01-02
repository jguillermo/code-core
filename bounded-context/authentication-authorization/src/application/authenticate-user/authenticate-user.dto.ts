export class AuthenticateUserDTO {
  constructor(
    public readonly method: string,
    public readonly credentials: Record<string, string>,
  ) {}
}
