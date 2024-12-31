import { AggregateRoot, PrimitiveTypes } from '@code-core/domain';
import { UserId } from './types/userId';
import { UserName } from './types/userName';
import { UserRoles } from './types/userPermissions';
import { UserPermissions } from './types/userRoles';
import { AccountId } from '@bounded-context/financial-management/src';
import { UserTypes } from './user.types';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: UserId, // ID único del usuario
    private readonly name: UserName, // Nombre del usuario
    private readonly roles: UserRoles, // Lista de roles
    private readonly permissions: UserPermissions, // Lista de permisos derivados de roles
  ) {
    super();
  }

  static create(data: UserTypes): User {
    const aggregate = new User(data.id, data.name, data.roles, data.permissions);
    return aggregate;
  }

  get id(): AccountId {
    return this._id;
  }

  toJson(): PrimitiveTypes<UserTypes> {
    return {
      id: this._id.value,
      name: this.name.value,
      roles: this.roles.value,
      permissions: this.permissions.value,
    };
  }

  /**
   * Autentica al usuario con credenciales básicas.
   * @param username Nombre de usuario
   * @param password Contraseña
   * @returns boolean
   */
  authenticate(username: string, password: string): boolean {
    return username === this.name.value && password === 'securePassword';
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
}
