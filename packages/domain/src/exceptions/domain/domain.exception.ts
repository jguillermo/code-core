import {AbstractException} from "../abstract.exception";
import {ExceptionCode} from "../exception-code";


export class DomainException extends AbstractException {
  constructor(message: string, exceptionCodess: ExceptionCode[] = []) {
    super(message, [ExceptionCode.DomainException, ...exceptionCodess]);
  }
}
