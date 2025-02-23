import { User } from './user';

export abstract class UserRepository {
  abstract findByUserName(username: string): Promise<User | null>;
  abstract persist(user: User): Promise<void>;
}
