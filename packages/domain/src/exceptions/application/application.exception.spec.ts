import { ApplicationException } from './application.exception';
import { ExceptionCode } from '../exception-code';

describe('Exceptions', () => {
  describe('ApplicationException', () => {
    it('should create an instance with correct properties', () => {
      const message = 'Application error';
      const exception = new ApplicationException(message);

      expect(exception).toBeInstanceOf(ApplicationException);
      expect(exception.message).toBe(message);
      expect(exception.code).toEqual(ExceptionCode.ApplicationException);
      expect(exception.description).toEqual('Application Exception (APP000)');
      expect(exception.timestamp).toBeInstanceOf(Date);
    });
  });
});
