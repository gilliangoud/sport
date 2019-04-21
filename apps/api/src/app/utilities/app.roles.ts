import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN_CRUD_ANY_ANYTHING',
  ANYONE = 'base',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.ADMIN) // define new or modify existing role. also takes an array.
  .createAny('*') // equivalent to .createOwn('video', ['*'])
  .deleteAny('*')
  .readAny('*')
  .updateAny('*') // explicitly defined attributes
  .deleteAny('*');
