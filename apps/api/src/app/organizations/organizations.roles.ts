import { roles } from '../utilities/app.roles';

const R = 'organization';

export enum OrganizationRoles {
  USER_READ_ANY_ORGANIZATION = 'USER_READ_ANY_ORGANIZATION',
  USER_READ_OWN_ORGANIZATION = 'USER_READ_OWN_ORGANIZATION',
  USER_CREATE_OWN_ORGANIZATION = 'USER_CREATE_OWN_ORGANIZATION',
  USER_UPDATE_OWN_ORGANIZATION = 'USER_UPDATE_OWN_ORGANIZATION',
  ADMIN_UPDATE_ANY_ORGANIZATION = 'ADMIN_UPDATE_ANY_ORGANIZATION',
}

roles
  .grant(OrganizationRoles.USER_READ_OWN_ORGANIZATION)
  .readOwn(R)
  .grant(OrganizationRoles.USER_READ_ANY_ORGANIZATION)
  .extend(OrganizationRoles.USER_READ_OWN_ORGANIZATION)
  .readAny(R)
  .grant(OrganizationRoles.USER_CREATE_OWN_ORGANIZATION)
  .extend(OrganizationRoles.USER_READ_OWN_ORGANIZATION)
  .createOwn(R)
  .grant(OrganizationRoles.USER_UPDATE_OWN_ORGANIZATION)
  .updateOwn(R)
  .grant(OrganizationRoles.ADMIN_UPDATE_ANY_ORGANIZATION)
  .extend(OrganizationRoles.USER_UPDATE_OWN_ORGANIZATION)
  .updateAny(R)
