import { DomainException } from './domain.exception';
import { ExceptionCode } from '../exception-code';
import { universalToString } from '../../common/utils/string/universal-to-string';

export class TypePrimitiveException extends DomainException {
  constructor(expectedType: string, receivedValue: any) {
    if (typeof receivedValue === 'string') {
      receivedValue = `"${receivedValue}"`;
    }
    super(`Validation Error: Expected a valid ${expectedType}, but received ${universalToString(receivedValue)}.`, [ExceptionCode.TypeFailed]);
  }
}
