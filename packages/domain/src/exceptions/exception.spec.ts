import {AbstractException} from "./abstract.exception";
import {ExceptionCode} from "./exception-code";


export class TestException extends AbstractException {
  constructor(message: string, exceptionCodes: ExceptionCode[] = []) {
    super(message, exceptionCodes);
  }
}


describe('Exceptions', () => {
  describe('AbstractException', () => {
    it('should create an instance with correct properties', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const message = 'Test message';
      const exception = new TestException(message, [ExceptionCode.DomainException]);

      expect(exception).toBeInstanceOf(AbstractException);
      expect(exception.message).toBe(message);
      expect(exception.exceptionCodes).toEqual([ExceptionCode.DomainException]);
      expect(exception.exceptionMessage).toEqual('Domain Exception (DOM000)');
      expect(exception.timestamp).toBeInstanceOf(Date);
      expect(exception.toJSON()).toEqual({
        "exceptionCodess": [
          "DOM000"
        ],
        "exceptionMessages": "Domain Exception (DOM000)",
        "message": "Test message",
        "name": "TestException",
        timestamp: exception.timestamp.toISOString(),
      });
      exception.logDetails();
      const expectedLog = `[Domain Exception (DOM000)]: ${message}, ${exception.timestamp}`;
      expect(consoleSpy).toHaveBeenCalledWith(expectedLog);
    });

  });
});
