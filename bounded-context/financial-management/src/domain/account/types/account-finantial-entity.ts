import { Level, StringTypeRequired } from '@code-core/domain';

@Level(2)
export class AccountFinantialEntity extends StringTypeRequired {
  static empty() {
    return new AccountFinantialEntity('');
  }
}
