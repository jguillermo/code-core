import { InfrastructureException } from '@code-core/domain';

export class PasswordEncryptorException extends InfrastructureException {
  constructor(message: string) {
    super(message, ['PASS-ENCRYPT-001']);
  }
}
