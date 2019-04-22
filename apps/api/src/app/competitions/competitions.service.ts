import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { Competition } from './competitions.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCompetitionDTO, User } from '@goud-sport/api-interface';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class CompetitionsService {
  constructor(@InjectModel('competitions') private competitionModel: Model<Competition>, private organizationsService: OrganizationsService) {}

  async findAll(): Promise<Competition[]> {
    return await this.competitionModel.find().populate('competitors');
  }

  async create(competitionDTO: CreateCompetitionDTO, user: User): Promise<Competition> {
    // get the club that is being referenced
    // check if the user is owner of the OR
    // check if the user has the rights to creating competitions for this club
    const { owner } = await this.organizationsService.findById(competitionDTO.owner);
    if (owner.toString() !== competitionDTO.owner.toString()) {
      throw new HttpException(
        'You do not own this property',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const competition = await this.competitionModel.create(competitionDTO);
    await competition.save();
    return competition.populate('owner');
  }
}
