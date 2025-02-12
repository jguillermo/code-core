import {
  User,
  UserRepository,
} from '@bounded-context/authentication-authorization';

export class MongoDBUserRepository extends UserRepository {
  findByUserName(username: string): Promise<User | null> {
    return username === 'null' ? Promise.resolve(null) : Promise.resolve(null);
  }
}
