import { Level, StringTypeRequired } from '@code-core/domain';

@Level(2)
export class AccountAccountNumber extends StringTypeRequired {
  static empty() {
    return new AccountAccountNumber('');
  }
}
