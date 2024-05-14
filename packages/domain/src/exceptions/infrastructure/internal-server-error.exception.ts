import {InfrastructureException, StatusCode} from "../index";

export class InternalServerErrorException extends InfrastructureException {
  constructor(message: string = 'Internal server error') {
    super(message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}
