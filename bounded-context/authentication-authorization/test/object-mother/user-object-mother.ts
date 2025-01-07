import { PrimitiveTypes } from '@code-core/domain';

import { UserTypes } from '../../src/domain/user/user.types';
import { User } from '../../src/domain/user/user';
import { UserRoles } from '../../src/domain/user/types/userPermissions';
import { UserAuthenticationDetails } from '../../src/domain/user/types/userAuthenticationDetails';
import { UserId } from '../../src/domain/user/types/userId';
import { UserName } from '../../src/domain/user/types/userName';
import { faker } from '@faker-js/faker';

export const UserObjectMother = (overrides?: Partial<PrimitiveTypes<UserTypes>>): User => {
  return new User(
    new UserId(overrides?.id ?? UserId.random()),
    new UserName(overrides?.name ?? faker.person.fullName()),
    new UserRoles(overrides?.roles ?? [faker.word.adverb({ length: { min: 3, max: 19 } })]),
    new UserAuthenticationDetails(overrides?.authenticationDetails ?? { password: faker.internet.password(), userName: faker.internet.username() }),
  );
};
