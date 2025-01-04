import { AbstractJsonType } from '@code-core/domain/dist/type/abstract-json-type';

interface AuthenticationDetails {
  password?: string;
  userName?: string;

  [key: string]: string | undefined;
}

export class UserAuthenticationDetails extends AbstractJsonType<AuthenticationDetails> {
  get password(): string | null {
    return this.value?.password ?? null;
  }
}
