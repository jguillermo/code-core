import { BooleanRequiredType, BooleanType } from './';

export class BooleanTypeImp extends BooleanType {
  constructor(value: any = null) {
    super(value as any);
  }
}

export class BooleanRequiredTypeImp extends BooleanRequiredType {
  constructor(value: any = null) {
    super(value as any);
  }
}
