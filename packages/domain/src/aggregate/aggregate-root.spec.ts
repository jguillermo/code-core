import { AggregateRoot, EventBase } from '@code-core/domain';

class TestEventBase extends EventBase {
  eventName(): string {
    return 'event.aggregate';
  }
}

class TestAggregateRoot extends AggregateRoot {
  static create() {
    const aggregate = new TestAggregateRoot();
    aggregate.record(new TestEventBase());
    return aggregate;
  }
}

describe('TestAggregateRoot', () => {
  it('eventName', () => {
    const aggregate = TestAggregateRoot.create();
    const event = aggregate.pullDomainEvents();
    const eventempty = aggregate.pullDomainEvents();

    expect(event.length).toEqual(1);
    expect(eventempty.length).toEqual(0);
    expect(event[0].eventName()).toEqual('event.aggregate');
  });
});
