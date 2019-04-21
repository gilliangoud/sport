import { User } from './users.interface';

export interface CreateOrgDTO {
  name: string;
  abbreviation?: string;
  image?: string;
  description?: string;
}
