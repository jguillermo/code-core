import { AbstractException } from '../abstract.exception';
import { ExceptionCode } from '../exception-code';

export class ApplicationException extends AbstractException {
  constructor(message: string, exceptionCodes: ExceptionCode[] = []) {
    super(message, [ExceptionCode.ApplicationException, ...exceptionCodes]);
  }
}
