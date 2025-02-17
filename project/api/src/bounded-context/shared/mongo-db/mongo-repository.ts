import { Model } from 'mongoose';
import { BulkWriteResult } from 'mongodb';

import { MongoCriteriaConverter, SearchCriteriaDto } from '@code-core/criteria';
import { AggregateRoot, IdType } from '@code-core/domain';

export class MongoRepository<T, E extends AggregateRoot> {
  private criteriaConverter: MongoCriteriaConverter;

  constructor(
    private model: Model<T>,
    private fromPrimitivesFn?: (data: any) => E,
  ) {
    this.criteriaConverter = new MongoCriteriaConverter();
  }

  private fromPrimitives(document: any): any {
    const data = {
      ...document.toJSON(),
      id: document.id,
    };
    return this.fromPrimitivesFn(data);
  }

  async findAll(): Promise<E[]> {
    return (await this.model.find().exec()).map((document: any) => {
      if (!(document instanceof Model)) {
        throw new Error('Data Base GetAllScenery Server Error');
      }
      return this.fromPrimitives(document);
    });
  }

  async find(query: object): Promise<E[] | null> {
    return (await this.model.find(query).exec()).map((document: any) => {
      if (!(document instanceof Model)) {
        throw new Error('Data Base GetAllScenery Server Error');
      }
      return this.fromPrimitives(document);
    });
  }

  async searchByCriteria(criteriaDto: SearchCriteriaDto): Promise<E[]> {
    const query = this.criteriaConverter.convert(criteriaDto);
    return (
      await this.model
        .find(query.filter as any, {})
        .sort(query.sort)
        .skip(query.skip)
        .limit(query.limit)
        .exec()
    ).map((document: any) => {
      if (!(document instanceof Model)) {
        throw new Error('Data Base GetAllScenery Server Error');
      }
      return this.fromPrimitives(document);
    });
  }

  async findOne(query: object): Promise<E | null> {
    const document: any = await this.model.findOne(query).exec();
    if (!(document instanceof Model)) {
      return null;
    }
    return this.fromPrimitives(document);
  }

  // async total(criteriaDto: SearchCriteriaDto): Promise<number> {
  //   const query = this.criteriaConverter.convert(criteriaDto);
  //   return await this.model.find(query.filter as any, {}).count().exec();
  // }

  async deleteById<I extends IdType>(
    id: I,
    byCutsomId?: boolean,
  ): Promise<void> {
    const $filter = byCutsomId ? { id: id.value } : { _id: id.value };
    await this.model.deleteOne($filter);
  }

  async deleteAll(): Promise<void> {
    await this.model.deleteMany();
  }

  async findById<I extends IdType>(id: I): Promise<E | null> {
    const document: any = await this.model.findById(id.value).exec();
    if (document && !(document instanceof Model)) {
      throw new Error('Data Base find Server Error');
    }
    return document ? this.fromPrimitives(document) : null;
  }

  async persist(aggregate: any): Promise<void> {
    const document = {
      ...aggregate.toPrimitives(),
      _id: aggregate.id.value,
      id: undefined,
    };

    await this.model.updateOne(
      { _id: aggregate.id.value },
      { $set: document },
      { upsert: true },
    );
  }

  async persistAndConfirm(aggregate: any, customId: string): Promise<boolean> {
    const updateCondition: any = { [customId]: aggregate.id.value };
    const updatedDocument = await this.model.updateOne(
      updateCondition,
      { $set: aggregate.toPrimitives() },
      { upsert: true },
    );
    return updatedDocument.modifiedCount > 0;
  }

  async bulkPersistAndConfirm(
    aggregates: any[],
    customId: string,
  ): Promise<BulkWriteResult> {
    const documents = aggregates.map((aggregate) => {
      return { ...aggregate.toPrimitives(), [customId]: aggregate.id.value };
    });

    const writes = documents.map((document) => {
      return {
        updateOne: {
          filter: { [customId]: document[customId] },
          update: { $set: document },
          upsert: true,
        },
      } as any;
    });

    return await this.model.bulkWrite(writes);
  }

  async bulkPersist(aggregates: any[]): Promise<void> {
    const documents = aggregates.map((aggregate) => {
      return {
        ...aggregate.toPrimitives(),
        _id: aggregate.id.value,
        id: undefined,
      };
    });

    const writes = documents.map((document) => {
      return {
        updateOne: {
          filter: { _id: document._id },
          update: { $set: document },
          upsert: true,
        },
      };
    });

    await this.model.bulkWrite(writes);
  }

  async create(aggregate: any): Promise<E> {
    const document = { ...aggregate.toPrimitives() };
    const updatedRecord = await this.model.create(document);
    return this.fromPrimitives(updatedRecord);
  }

  async deleteLogicalById<I extends IdType>(
    id: I,
    byCutsomId?: boolean,
  ): Promise<boolean> {
    const $filter = { isActive: true };
    const idType = byCutsomId ? 'id' : '_id';
    $filter[idType] = id.value;
    const updatedDocument = await this.model.updateOne(
      $filter,
      { $set: { isActive: false } },
      { new: true },
    );
    return updatedDocument.modifiedCount > 0;
  }
}
