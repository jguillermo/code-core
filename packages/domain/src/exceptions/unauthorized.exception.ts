import {AbstractException} from "./abstract.exception";
import {StatusCode} from "./status-code";

export class UnauthorizedException extends AbstractException {
  constructor(message: string = 'Unauthorized access') {
    super(message, StatusCode.UNAUTHORIZED);
  }
}
