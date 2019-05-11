import { User, IGeometry, competitorStatus } from '@goud-sport/api-interface';
import { Document } from 'mongoose';

export interface Competition extends Document{
  owner: string;
  competitors?: [{
    competitor: string | User,
    status: competitorStatus
  }]
  title: string;
  image?: string;
  description?: string;
  location?: IGeometry;
}
