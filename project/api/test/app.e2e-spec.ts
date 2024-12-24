import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingAppModule } from './testing-app-module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ({ app } = await TestingAppModule.createE2e([]));
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
