import {AbstractException, StatusCode} from "../index";

export class ApplicationException extends AbstractException {
  constructor(message: string, statusCode: StatusCode = StatusCode.APPLICATION_ERROR) {
    super(message, statusCode);
  }
}
