import { Controller, Post } from '@nestjs/common';

@Controller('account-management')
export class AccountManagementControllerController {
  @Post('create-financial-account')
  public createFinancialAccount(): any {
    return { status: 'success' };
  }
}
