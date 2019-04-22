import { User, IGeometry } from '@goud-sport/api-interface';
import { Document } from 'mongoose';
export interface Competition extends Document{
  owner: string;
  competitors?: [string] | [User];
  title: string;
  image?: string;
  description?: string;
  location?: IGeometry;
}
