import {DomainException} from "./domain.exception";
import {StatusCode} from "../status-code";

export class ValidationException extends DomainException {
  constructor(errors: string[]) {
    const message = `Validation failed: ${errors.join(', ')}`;
    super(message, StatusCode.VALIDATION_ERROR);
  }
}
