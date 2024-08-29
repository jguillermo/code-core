import { AggregateRoot, IdType, NumberTypeOptional, StringTypeRequired } from '@code-core/domain';
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

  it('id stringREquired and number optional', () => {
    class Aggregate extends AggregateRoot {
      constructor(
        private readonly _id: IdType,
        private _name: StringTypeRequired,
        private _age: NumberTypeOptional,
      ) {
        super();
      }

      get id(): IdType {
        return this._id;
      }

      get name(): StringTypeRequired {
        return this._name;
      }

      get age(): NumberTypeOptional {
        return this._age;
      }
    }

    type expectedPrimitives = {
      id: string;
      name: string;
      age: number | null;
    };

    expectTypeOf<PrimitiveAggregate<Aggregate>>().toEqualTypeOf<expectedPrimitives>();
  });

  it('id array', () => {
    class Aggregate extends AggregateRoot {
      constructor(
        private readonly _id: IdType,
        private _tags: StringTypeRequired[],
      ) {
        super();
      }

      get id(): IdType {
        return this._id;
      }

      get tags(): StringTypeRequired[] {
        return this._tags;
      }
    }

    type expectedPrimitives = {
      id: string;
      tags: string[];
    };

    expectTypeOf<PrimitiveAggregate<Aggregate>>().toEqualTypeOf<expectedPrimitives>();
  });
});
