import {DomainException} from "./domain.exception";
import {ExceptionCode} from "../exception-code";


export class ValidationException extends DomainException {
  constructor(errors: string[]) {
    super(`Input validation failed: ${errors.join(', ')}`, [ExceptionCode.ValidationFailed]);
  }
}
