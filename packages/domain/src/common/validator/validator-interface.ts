export interface ValidatorInterface {
  isValid(): boolean;

  validatorMessage(): string;
}
