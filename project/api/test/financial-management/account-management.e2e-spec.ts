import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingAppModule } from '../testing-app-module';
import * as request from 'supertest';

describe('createFinancialAccount (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    ({ app } = await TestingAppModule.createE2e([
      // AccountRepository,
    ]));
  });

  it('[/account-management/create-financial-account (POST)]', async () => {
    // const bodyRequest = {
    //   id: IdType.random(),
    //   name: 'name',
    //   type: 'REAL',
    //   currency: 'PEN',
    //   balance: 10,
    //   financialEntity: 'financialEntity',
    //   number: '234234234234',
    //   tags: ['tags1'],
    // };

    const requestCreate = await request(app.getHttpServer()).post(
      `/account-management/create-financial-account`,
    );

    expect(requestCreate.statusCode).toBe(HttpStatus.CREATED);
    expect(requestCreate.body).toEqual({ status: 'success' });
  });

  afterAll(async () => {
    await app.close();
  });
});
