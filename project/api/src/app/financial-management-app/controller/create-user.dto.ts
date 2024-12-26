import { OmitType } from '@nestjs/swagger';
import { CreateFinancialAccountDto } from '@bounded-context/financial-management';

export class Hladto extends OmitType(CreateFinancialAccountDto, [
  'levelValidation',
] as const) {}
