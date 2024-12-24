import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingAppModule } from '../testing-app-module';
import * as request from 'supertest';
import { IdType } from '@code-core/domain';
import { AccountRepository } from '@bounded-context/financial-management';
import { JsonCompare } from '@code-core/test';

describe('createFinancialAccount (e2e)', () => {
  let app: INestApplication;
  let accountRepository: AccountRepository;

  beforeAll(async () => {
    ({ app, accountRepository } = await TestingAppModule.createE2e([
      AccountRepository,
    ]));
  });

  it('[/account-management/create-financial-account (POST)]', async () => {
    const bodyRequest = {
      id: IdType.random(),
      name: 'namenamenamename',
      type: 'Real',
      currency: 'PEN',
      balance: 10,
      financialEntity: 'financialEntity',
      number: '234234234234',
      tags: ['tags1'],
    };

    const requestCreate = await request(app.getHttpServer())
      .post(`/account-management/create-financial-account`)
      .send(bodyRequest);

    expect(requestCreate.body).toEqual({ status: 'success' });
    expect(requestCreate.statusCode).toBe(HttpStatus.CREATED);

    const account = await accountRepository.findById(bodyRequest.id);

    expect(
      JsonCompare.include(
        {
          name: 'namenamenamename',
          type: 'Real',
          currency: 'PEN',
          balance: 10,
          financialEntity: 'financialEntity',
          number: '234234234234',
          tags: ['tags1'],
        },
        account?.toJson(),
      ),
    ).toEqual([]);
  });

  afterAll(async () => {
    await app.close();
  });
});
