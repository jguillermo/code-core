import {AbstractException} from "./abstract.exception";
import {StatusCode} from "./status-code";

export class AggregateNotFoundException extends AbstractException {
  constructor(aggregateName: string, aggregateId: string) {
    const message = `Aggregate ${aggregateName} with ID ${aggregateId} was not found.`;
    super(message, StatusCode.AGGREGATE_NOT_FOUND);
  }
}
