import { Document } from 'mongoose';
import { User } from '@goud-sport/api-interface';

export interface Organization extends Document {
  name: string;
  owner: User;
  abbreviation?: string;
  image?: String,
  description?: String
}
