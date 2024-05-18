import {AbstractException} from "../abstract.exception";
import {ExceptionCode} from "../exception-code";

export class InfrastructureException extends AbstractException {
  constructor(message: string, exceptionCodess: ExceptionCode[] = []) {
    super(message, [ExceptionCode.InfrastructureException, ...exceptionCodess]);
  }
}
