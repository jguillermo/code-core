import {
  User,
  UserRepository,
  UserTypes,
} from '@bounded-context/authentication-authorization';
import { Model, Promise } from 'mongoose';
import { MongoRepository } from '../../../../shared/mongo-db/mongo-repository';
import { UserDocument } from './mongodb-user-schema';
import { InjectModel } from '@nestjs/mongoose';

export class MongodbUserRepository extends UserRepository {
  private mongodb: MongoRepository<UserDocument, User>;

  constructor(
    @InjectModel(UserDocument.name)
    private model: Model<UserDocument>,
  ) {
    super();
    this.mongodb = new MongoRepository<UserDocument, User>(
      this.model,
      MongodbUserRepository.fromPrimitives,
    );
  }

  findByUserName(username: string): Promise<User | null> {
    return this.mongodb.findOne({ name: username });
  }

  persist(user: User): Promise<void> {
    return this.mongodb.persist(user.toJson());
  }

  static fromPrimitives(items: any): User {
    const data = new UserTypes(items.currentLevel, {
      id: items.id,
      name: items.name,
      roles: items.roles,
      authenticationDetails: items.authenticationDetails,
    });
    return User.create(data);
  }
}
