import {AbstractException} from "./abstract.exception";
import {StatusCode} from "./status-code";

export class InternalServerErrorException extends AbstractException {
  constructor(message: string = 'Internal server error') {
    super(message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}
