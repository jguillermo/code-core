import { CreateFinancialAccountDto } from '../../src';
import { JsonCompare } from '@code-core/test';
import { extractClassProperties } from './analyzeClass';

describe('doc', () => {
  test('properties', async () => {
    const resultado = extractClassProperties(CreateFinancialAccountDto);
    console.log('\n===== Resultado Final =====');
    console.log(JSON.stringify(resultado, null, 2));

    expect(JsonCompare.strict([1], [1])).toEqual([]);
  });
});
