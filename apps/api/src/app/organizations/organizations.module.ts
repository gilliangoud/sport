import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from '../models/organizations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'organizations', schema: schema }]),
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService]
})
export class OrganizationsModule {}
