import {
  AbstractException,
  AggregateNotFoundException,
  ApplicationException,
  DomainException,
  InfrastructureException,
  InternalServerErrorException,
  StatusCode,
  UnauthorizedException,
  ValidationException
} from "./index";

class TestException extends AbstractException {
  constructor(message: string, statusCode: StatusCode) {
    super(message, statusCode);
  }
}

describe('Exceptions', () => {
  describe('AbstractException', () => {
    it('should create an instance with correct properties', () => {
      const message = 'Test message';
      const statusCode = StatusCode.BAD_REQUEST;
      const exception = new TestException(message, statusCode);

      expect(exception).toBeInstanceOf(AbstractException);
      expect(exception.message).toBe(message);
      expect(exception.statusCode).toBe(statusCode);
      expect(exception.code).toBe('BAD_REQUEST');
      expect(exception.timestamp).toBeInstanceOf(Date);
    });

    it('should log details correctly', () => {
      console.error = jest.fn();

      const message = 'Test message';
      const statusCode = StatusCode.BAD_REQUEST;
      const exception = new TestException(message, statusCode);

      exception.logDetails();

      expect(console.error).toHaveBeenCalledWith(`[TestException] Test message - Code: BAD_REQUEST, Status: 400, Timestamp: ${exception.timestamp}`);
    });

    it('should convert to JSON correctly', () => {
      const message = 'Test message';
      const statusCode = StatusCode.BAD_REQUEST;
      const exception = new TestException(message, statusCode);

      const json = exception.toJSON();

      expect(json).toEqual({
        code: 'BAD_REQUEST',
        message: 'Test message',
        statusCode: 400,
        timestamp: exception.timestamp.toISOString(),
      });
    });
  });
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

  describe('InfrastructureException', () => {
    describe('InfrastructureException', () => {
      it('should create an instance with correct properties', () => {
        const message = 'Infrastructure error';
        const statusCode = StatusCode.INFRASTRUCTURE_ERROR;
        const exception = new InfrastructureException(message);

        expect(exception).toBeInstanceOf(InfrastructureException);
        expect(exception.message).toBe(message);
        expect(exception.statusCode).toBe(statusCode);
        expect(exception.code).toBe('INFRASTRUCTURE_ERROR');
        expect(exception.timestamp).toBeInstanceOf(Date);
      });
    });


    describe('UnauthorizedException', () => {
      it('should create an instance with correct properties', () => {
        const message = 'Unauthorized access';
        const statusCode = StatusCode.UNAUTHORIZED;
        const exception = new UnauthorizedException(message);

        expect(exception).toBeInstanceOf(UnauthorizedException);
        expect(exception.message).toBe(message);
        expect(exception.statusCode).toBe(statusCode);
        expect(exception.code).toBe('UNAUTHORIZED');
        expect(exception.timestamp).toBeInstanceOf(Date);
      });
    });

    describe('InternalServerErrorException', () => {
      it('should create an instance with correct properties', () => {
        const message = 'Internal server error';
        const statusCode = StatusCode.INTERNAL_SERVER_ERROR;
        const exception = new InternalServerErrorException(message);

        expect(exception).toBeInstanceOf(InternalServerErrorException);
        expect(exception.message).toBe(message);
        expect(exception.statusCode).toBe(statusCode);
        expect(exception.code).toBe('INTERNAL_SERVER_ERROR');
        expect(exception.timestamp).toBeInstanceOf(Date);
      });
    });
  });


  describe('ApplicationException', () => {
    describe('ApplicationException', () => {
      it('should create an instance with correct properties', () => {
        const message = 'Application error';
        const statusCode = StatusCode.APPLICATION_ERROR;
        const exception = new ApplicationException(message);

        expect(exception).toBeInstanceOf(ApplicationException);
        expect(exception.message).toBe(message);
        expect(exception.statusCode).toBe(statusCode);
        expect(exception.code).toBe('APPLICATION_ERROR');
        expect(exception.timestamp).toBeInstanceOf(Date);
      });
    });
  });

});
