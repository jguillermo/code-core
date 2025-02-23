import { User } from './user';
import { UserId } from './types/userId';

export abstract class UserRepository {
  abstract findByUserName(username: string): Promise<User | null>;
  abstract findById(id: UserId): Promise<User | null>;
  abstract persist(user: User): Promise<void>;
}
