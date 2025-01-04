import { AggregateRoot, PrimitiveTypes } from '@code-core/domain';
import { UserId } from './types/userId';
import { UserName } from './types/userName';
import { UserRoles } from './types/userPermissions';
import { AccountId } from '@bounded-context/financial-management/src';
import { UserTypes } from './user.types';
import { UserAuthenticationDetails } from './types/userAuthenticationDetails';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: UserId, // ID único del usuario
    private readonly name: UserName, // Nombre del usuario
    private readonly roles: UserRoles, // Lista de roles
    private readonly authenticationDetails: UserAuthenticationDetails, // Detalles de autenticación dinámica
  ) {
    super();
  }

  static create(data: UserTypes): User {
    return new User(data.id, data.name, data.roles, data.authenticationDetails);
  }

  get id(): AccountId {
    return this._id;
  }

  toJson(): PrimitiveTypes<UserTypes> {
    return {
      id: this._id.value,
      name: this.name.value,
      roles: this.roles.value,
      authenticationDetails: this.authenticationDetails.value,
    };
  }

  /**
   * Asigna un rol al usuario.
   * @param role Rol a asignar
   */
  assignRole(role: string): void {
    this.roles.addItem(role);
  }

  /**
   * Revoca un rol del usuario.
   * @param role Rol a revocar
   */
  revokeRole(role: string): void {
    this.roles.removeItem(role);
  }

  get password(): string | null {
    return this.authenticationDetails.password;
  }
}
