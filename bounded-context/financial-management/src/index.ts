import { AggregateRoot } from '@code-core/domain';

export const NAME = 'financial-management';

class Aggregate extends AggregateRoot {}

console.log(new Aggregate().pullDomainEvents());
