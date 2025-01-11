import { InfrastructureException } from '@code-core/domain';

export class DataSignerException extends InfrastructureException {
  constructor(message: string) {
    super(message, ['DATA-SIGNER-001']);
  }
}
