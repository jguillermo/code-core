import { DomainException } from './domain.exception';
import { ExceptionCode } from '../exception-code';
import { universalToString } from '../../common/utils/string/universal-to-string';

export class TypePrimitiveException extends DomainException {
  constructor(type: string, value: any) {
    super(`Instance invalid Type ${type} (${universalToString(value)}).`, [ExceptionCode.TypePrimitiveFailed]);
  }
}
