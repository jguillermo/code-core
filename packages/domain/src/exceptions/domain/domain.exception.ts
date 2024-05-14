import {AbstractException} from "../abstract.exception";
import {StatusCode} from "../status-code";


export class DomainException extends AbstractException {
  constructor(message: string, statusCode: StatusCode = StatusCode.DOMAIN_ERROR) {
    super(message, statusCode);
  }
}
