import {InfrastructureException, InternalServerErrorException, StatusCode, UnauthorizedException} from "../index";

describe('Exceptions', () => {
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

});
