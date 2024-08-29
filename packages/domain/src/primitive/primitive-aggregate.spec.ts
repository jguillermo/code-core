import { AggregateRoot, IdType } from '@code-core/domain';
import { PrimitiveAggregate } from './primitive-aggregate';
import { expectTypeOf } from 'expect-type';

describe('Primitive aggregate', () => {
  it('id readonly', () => {
    class Aggregate extends AggregateRoot {
      constructor(public id: IdType) {
        super();
      }
    }

    class AggregateB extends AggregateRoot {
      constructor(public readonly _id: IdType) {
        super();
      }
    }

    class AggregateC extends AggregateRoot {
      constructor(private readonly _id: IdType) {
        super();
      }

      get id(): IdType {
        return this._id;
      }
    }

    type expectedPrimitives = {
      id: string;
    };

    expectTypeOf<PrimitiveAggregate<Aggregate>>().toEqualTypeOf<expectedPrimitives>();
    expectTypeOf<PrimitiveAggregate<AggregateB>>().toEqualTypeOf<expectedPrimitives>();
    expectTypeOf<PrimitiveAggregate<AggregateC>>().toEqualTypeOf<expectedPrimitives>();
  });
});
