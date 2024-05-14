import {InfrastructureException, StatusCode} from "../index";

export class UnauthorizedException extends InfrastructureException {
  constructor(message: string = 'Unauthorized access') {
    super(message, StatusCode.UNAUTHORIZED);
  }
}
