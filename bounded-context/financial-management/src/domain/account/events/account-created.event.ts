import { EventBase, PrimitiveTypes } from '@code-core/domain';
import { AccountData } from '../account.data';

export class AccountCreatedEvent extends EventBase {
  public readonly id: string;

  constructor(data: Required<PrimitiveTypes<AccountData>>) {
    super();
    this.id = data.id;
  }

  eventName(): string {
    return 'financial-management.account.created';
  }
}
