import {AbstractException} from "./abstract.exception";
import {StatusCode} from "./status-code";

export class ApplicationException extends AbstractException {
  constructor(message: string) {
    super(message, StatusCode.APPLICATION_ERROR);
  }
}
