import { InfrastructureException } from './infrastructure.exception';
import { ExceptionCode } from '../exception-code';
import { InternalErrorException } from './internal-error.exception';

describe('Exceptions', () => {
  describe('InfrastructureException', () => {
    describe('InfrastructureException', () => {
      it('should create an instance with correct properties', () => {
        const message = 'Infrastructure error';
        const exceptionCodes = ExceptionCode.InfrastructureException;
        const exception = new InfrastructureException(message);

        expect(exception).toBeInstanceOf(InfrastructureException);
        expect(exception.message).toBe(message);
        expect(exception.exceptionCodes).toEqual([
          ExceptionCode.InfrastructureException,
        ]);
        expect(exception.exceptionMessage).toEqual(
          'Infrastructure Exception (INF000)',
        );
        expect(exception.timestamp).toBeInstanceOf(Date);
      });
    });

    describe('InternalErrorException', () => {
      it('should create an instance with correct properties', () => {
        const message = 'Internal error';
        const exception = new InternalErrorException(message);

        expect(exception).toBeInstanceOf(InternalErrorException);
        expect(exception.message).toBe(`Failed, internal error: ${message}`);
        expect(exception.exceptionCodes).toEqual([
          ExceptionCode.InfrastructureException,
          ExceptionCode.InternalError,
        ]);
        expect(exception.exceptionMessage).toEqual(
          'Infrastructure Exception (INF000), Internal Error (INF001)',
        );
        expect(exception.timestamp).toBeInstanceOf(Date);
      });
    });
  });
});
