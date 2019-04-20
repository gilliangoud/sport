import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Organization } from './organizations.interface';
import { CreateOrgDTO, User } from '@goud-sport/api-interface';

@Injectable()
export class OrganizationsService {
  constructor(@InjectModel('Organizations') private organizationModel: Model<Organization>) {}

  async findAll(): Promise<Organization[]> {
    return await this.organizationModel.find().populate('owner');
  }

  async create(orgDTO: CreateOrgDTO, user: User): Promise<Organization> {
    const org = await this.organizationModel.create({
      ...orgDTO,
      owner: user,
    });
    await org.save();
    return org.populate('owner');
  }

  async update(
    id: string,
    orgDTO: Partial<CreateOrgDTO>,
    userId: string,
  ): Promise<Organization> {
    const org = await this.organizationModel.findById(id);
    if (userId !== org.owner.toString()) {
      throw new HttpException(
        'You do not own this property',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await org.update(orgDTO);
    return await this.organizationModel.findById(id).populate('owner');
  }
}
