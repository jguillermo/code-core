import { AbstractJsonType } from '@code-core/domain/dist/type/abstract-json-type';
import { AddValidate } from '@code-core/domain';

export interface AuthenticationDetails {
  username_password?: { password: string; userName: string } | undefined;
  [key: string]: object | undefined;
}

@AddValidate([{ validator: 'IsOptional' }])
export class UserAuthenticationDetails extends AbstractJsonType<AuthenticationDetails, null> {
  constructor(value: AuthenticationDetails | null = null) {
    super(value);
  }

  get password(): string | null {
    return this.value?.username_password?.password ?? null;
  }
}
