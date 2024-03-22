import { EventBase } from '@code-core/domain';

export abstract class AggregateRoot {
  private domainEvents: EventBase[] = [];

  protected record<T extends EventBase>(event: T) {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): EventBase[] {
    const events: EventBase[] = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }
}
