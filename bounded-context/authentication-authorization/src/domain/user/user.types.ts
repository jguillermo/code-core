import { UserId } from './types/userId';
import { UserName } from './types/userName';
import { UserRoles } from './types/userPermissions';
import { UserPermissions } from './types/userRoles';
import { AggregateTypes, DataTypes } from '@code-core/domain';

export class UserTypes extends AggregateTypes {
  public readonly id: UserId;
  public readonly name: UserName;
  public readonly roles: UserRoles;
  public readonly permissions: UserPermissions;

  constructor(currentLevel: number, params: DataTypes<UserTypes>) {
    super(currentLevel);
    this.id = this.initializeType(UserId, params.id);
    this.name = this.initializeType(UserName, params.name);
    this.roles = this.initializeType(UserRoles, params.roles);
    this.permissions = this.initializeType(UserPermissions, params.permissions);
  }
}
