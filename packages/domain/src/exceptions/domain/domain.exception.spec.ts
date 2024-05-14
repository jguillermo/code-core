import {AggregateNotFoundException, DomainException, StatusCode, ValidationException} from "../index";


describe('DomainException', () => {
  describe('AggregateNotFoundException', () => {
    it('should create an instance with correct properties', () => {
      const aggregateName = 'User';
      const aggregateId = '123';
      const message = `Aggregate ${aggregateName} with ID ${aggregateId} was not found.`;
      const statusCode = StatusCode.AGGREGATE_NOT_FOUND;
      const exception = new AggregateNotFoundException(aggregateName, aggregateId);

      expect(exception).toBeInstanceOf(AggregateNotFoundException);
      expect(exception.message).toBe(message);
      expect(exception.statusCode).toBe(statusCode);
      expect(exception.code).toBe('AGGREGATE_NOT_FOUND');
      expect(exception.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('ValidationException', () => {
    it('should create an instance with correct properties', () => {
      const errors = ['Field1 is required', 'Field2 must be a number'];
      const message = `Validation failed: ${errors.join(', ')}`;
      const statusCode = StatusCode.VALIDATION_ERROR;
      const exception = new ValidationException(errors);

      expect(exception).toBeInstanceOf(ValidationException);
      expect(exception.message).toBe(message);
      expect(exception.statusCode).toBe(statusCode);
      expect(exception.code).toBe('VALIDATION_ERROR');
      expect(exception.timestamp).toBeInstanceOf(Date);
    });
  });
  describe('DomainException', () => {
    it('should create an instance with correct properties', () => {
      const message = 'Domain error';
      const statusCode = StatusCode.DOMAIN_ERROR;
      const exception = new DomainException(message);

      expect(exception).toBeInstanceOf(DomainException);
      expect(exception.message).toBe(message);
      expect(exception.statusCode).toBe(statusCode);
      expect(exception.code).toBe('DOMAIN_ERROR');
      expect(exception.timestamp).toBeInstanceOf(Date);
    });
  });
});

