export class RegisterTransactionDto {
  /*
   fromAccountId: string;
    toAccountId: string;
    amount: number;
    description: string;
    category?: string; // Optional, for advanced levels
  * */
  constructor(
    public readonly fromAccountId: string,
    public readonly toAccountId: string,
    public readonly amount: number,
    public readonly description: string,
    public readonly category: string,
  ) {}
}
