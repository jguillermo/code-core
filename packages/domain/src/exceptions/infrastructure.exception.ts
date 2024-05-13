import {AbstractException} from "./abstract.exception";
import {StatusCode} from "./status-code";

export class InfrastructureException extends AbstractException {
  constructor(message: string) {
    super(message, StatusCode.INFRASTRUCTURE_ERROR);
  }
}
