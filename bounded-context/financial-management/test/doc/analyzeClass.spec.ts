import { CreateFinancialAccountDto } from '../../src';
import { JsonCompare } from '@code-core/test';
import { analyzeClass } from './analyzeClass';

describe('doc', () => {
  test('properties', async () => {
    const resultado = analyzeClass(CreateFinancialAccountDto);
    console.log('\n===== Resultado Final =====');
    console.log(JSON.stringify(resultado, null, 2));

    expect(JsonCompare.strict(resultado, [])).toEqual([]);
  });
});
