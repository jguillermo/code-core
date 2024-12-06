import { Level, StringTypeRequired } from '@code-core/domain';

@Level(2)
export class AccountFinancialEntity extends StringTypeRequired {
  static empty() {
    return new AccountFinancialEntity('');
  }
}
