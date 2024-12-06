import { AbstractArrayType, AddValidate, Level, StringTypeRequired } from '@code-core/domain';

class AccountTag extends StringTypeRequired {}

@Level(3)
@AddValidate([{ validator: 'IsOptional' }, { validator: 'ArrayMinSize', value: 1 }])
export class AccountListTag extends AbstractArrayType<AccountTag, null> {
  constructor(value: string[] | null = null) {
    super(value);
  }

  getItemClass(value: string): AccountTag {
    return new AccountTag(value);
  }

  static empty(): AccountListTag {
    return new AccountListTag([]);
  }
}
