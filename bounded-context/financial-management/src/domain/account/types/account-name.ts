import { AddValidate, StringTypeRequired } from '@code-core/domain';

@AddValidate([
  { validator: 'Min', value: 3 },
  { validator: 'Max', value: 50 },
])
export class AccountName extends StringTypeRequired {}
