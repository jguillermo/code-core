import { Body, Controller, Post } from '@nestjs/common';
import { CreateFinancialAccount } from '@bounded-context/financial-management/src/application/account-management/create-financial-account/create-financial-account';
import { CreateFinancialAccountDto } from '@bounded-context/financial-management/src/application/account-management/create-financial-account/create-financial-account.dto';

@Controller('account-management')
export class AccountManagementController {
  constructor(
    private readonly _createFinancialAccount: CreateFinancialAccount,
  ) {}

  @Post('create-financial-account')
  public async createFinancialAccount(
    @Body() dto: CreateFinancialAccountDto,
  ): Promise<void> {
    return await this._createFinancialAccount.execute(dto);
  }
}
