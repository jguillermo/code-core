import {AbstractException} from "../abstract.exception";
import {ExceptionCode} from "../exception-code";

export class ApplicationException extends AbstractException {
  constructor(message: string, exceptionCodess: ExceptionCode[] = []) {
    super(message, [ExceptionCode.ApplicationException, ...exceptionCodess]);
  }
}
