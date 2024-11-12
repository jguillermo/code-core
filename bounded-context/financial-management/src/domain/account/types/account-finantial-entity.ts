import { StringTypeRequired } from '@code-core/domain';

export class AccountFinantialEntity extends StringTypeRequired {
  static empty() {
    return new AccountFinantialEntity('');
  }
}
