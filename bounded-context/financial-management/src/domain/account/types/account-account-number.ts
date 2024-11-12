import { StringTypeRequired } from '@code-core/domain';

export class AccountAccountNumber extends StringTypeRequired {
  static empty() {
    return new AccountAccountNumber('');
  }
}
