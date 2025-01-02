import { User } from './user';

export abstract class UserRepository {
  abstract findByAttribute(attribute: string, username: string): Promise<User | null>;
}
