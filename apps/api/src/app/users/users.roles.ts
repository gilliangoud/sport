import { roles } from '../utilities/app.roles';

export enum UserRoles {
  USER_UPDATE_OWN_USER = 'USER_UPDATE_OWN_USER',
  ADMIN_UPDATE_ANY_USER = 'ADMIN_UPDATE_ANY_USER',
}

roles
  .grant(UserRoles.USER_UPDATE_OWN_USER) // define new or modify existing role. also takes an array.
  .updateOwn('user') // equivalent to .createOwn('video', ['*'])
  .grant(UserRoles.ADMIN_UPDATE_ANY_USER) // switch to another role without breaking the chain
  .extend(UserRoles.USER_UPDATE_OWN_USER) // inherit role capabilities. also takes an array
  .updateAny('user') // explicitly defined attributes
