import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingAppModule } from '../testing-app-module';
import * as request from 'supertest';
import { JsonCompare } from '@code-core/test';
import {
  UserId,
  UserRepository,
} from '@bounded-context/authentication-authorization';

describe('User Register (e2e) [/user-register (POST)]', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    ({ app, userRepository } = await TestingAppModule.createE2e([
      UserRepository,
    ]));
  });

  it('valid values', async () => {
    const bodyRequest = {
      id: '3a10a398-8829-41a4-ba37-83dcf386d1c1',
      name: 'Jose',
      roles: ['ADMIN'],
      details: {
        username_password: {
          userName: 'admin',
          password: '123456',
        },
      },
    };

    const requestCreate = await request(app.getHttpServer())
      .post(`/register-user`)
      .send(bodyRequest);
    expect(requestCreate.statusCode).toBe(HttpStatus.CREATED);

    const user = await userRepository.findById(
      new UserId('3a10a398-8829-41a4-ba37-83dcf386d1c1'),
    );

    expect(
      JsonCompare.include(
        {
          id: '3a10a398-8829-41a4-ba37-83dcf386d1c1',
          name: 'Jose',
          roles: ['ADMIN'],
          authenticationDetails: {
            username_password: {
              userName: 'admin',
            },
          },
        },
        user?.toJson(),
      ),
    ).toEqual([]);
  });

  afterAll(async () => {
    await app.close();
  });
});
