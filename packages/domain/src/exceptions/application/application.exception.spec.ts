import {ApplicationException, StatusCode} from "../index";

describe('Exceptions', () => {


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
