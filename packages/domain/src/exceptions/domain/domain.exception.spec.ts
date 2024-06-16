import { ExceptionCode } from '../exception-code';
import { AggregateNotFoundException } from './aggregate-not-found.exception';
import { DomainException } from './domain.exception';
import { ValidationException } from './validation.exception';

describe('DomainException', () => {
  describe('AggregateNotFoundException', () => {
    it('should create an instance with correct properties', () => {
      const aggregateName = 'User';
      const aggregateId = '123';
      const message = `User with ID 123 not found.`;
      const exception = new AggregateNotFoundException(
        aggregateName,
        aggregateId,
      );

      expect(exception).toBeInstanceOf(AggregateNotFoundException);
      expect(exception.message).toBe(message);
      expect(exception.exceptionCodes).toEqual([
        ExceptionCode.DomainException,
        ExceptionCode.AggregateNotFound,
      ]);
      expect(exception.exceptionMessage).toEqual(
        'Domain Exception (DOM000), Aggregate Not Found (DOM002)',
      );
      expect(exception.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('ValidationException', () => {
    it('should create an instance with correct properties', () => {
      const errors = ['Field1 is required', 'Field2 must be a number'];
      const message = `Validation failed, Field1 is required, Field2 must be a number`;
      const exception = new ValidationException(errors);

      expect(exception).toBeInstanceOf(ValidationException);
      expect(exception.message).toBe(message);
      expect(exception.exceptionCodes).toEqual([
        ExceptionCode.DomainException,
        ExceptionCode.ValidationFailed,
      ]);
      expect(exception.exceptionMessage).toEqual(
        'Domain Exception (DOM000), Validation Failed (DOM001)',
      );
      expect(exception.timestamp).toBeInstanceOf(Date);
    });
  });
  describe('DomainException', () => {
    it('should create an instance with correct properties', () => {
      const message = 'Domain error';
      const exception = new DomainException(message);

      expect(exception).toBeInstanceOf(DomainException);
      expect(exception.message).toBe(message);
      expect(exception.exceptionCodes).toEqual([ExceptionCode.DomainException]);
      expect(exception.exceptionMessage).toEqual('Domain Exception (DOM000)');
      expect(exception.timestamp).toBeInstanceOf(Date);
    });
  });
});
