import {AbstractException} from "./abstract.exception";
import {StatusCode} from "./status-code";

export class ValidationException extends AbstractException {
  constructor(errors: string[]) {
    const message = `Validation failed: ${errors.join(', ')}`;
    super(message, StatusCode.VALIDATION_ERROR);
  }
}
