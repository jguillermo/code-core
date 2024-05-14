import {AbstractException, StatusCode} from "../index";

export class InfrastructureException extends AbstractException {
  constructor(message: string, statusCode: StatusCode = StatusCode.INFRASTRUCTURE_ERROR) {
    super(message, statusCode);
  }
}
