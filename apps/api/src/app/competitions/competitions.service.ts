import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { Competition } from './competitions.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCompetitionDTO, User, UpdateCompetitionDTO, UpdateCompetitorDTO, competitorStatus } from '@goud-sport/api-interface';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class CompetitionsService {
  constructor(@InjectModel('competitions') private competitionModel: Model<Competition>, private organizationsService: OrganizationsService) {}

  async findAll(): Promise<Competition[]> {
    return await this.competitionModel.find().populate('competitors');
  }

  async findById(id: string): Promise<Competition> {
    const competition = await this.competitionModel.findById(id).populate('competitors');
    if (!competition) {
      throw new HttpException('Competition not found', HttpStatus.NO_CONTENT);
    }
    return competition;
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

  async update(
    id: string,
    competitionDTO: Partial<UpdateCompetitionDTO>,
  ): Promise<Competition> {
    const competition = await this.competitionModel.findById(id);
    await competition.update(competitionDTO);
    return await this.competitionModel.findById(id).populate('competitors');
  }

  async addParticipant(id: string, userId: any): Promise<Competition> {
    const competition: Competition = await this.competitionModel.findById(id);
    if (competition.competitors.includes(userId)) {
      throw new HttpException(
        "You're already in!",
        HttpStatus.ACCEPTED,
      )
    }
    competition.competitors.push({ competitor: userId, status: competitorStatus.Entered });
    await competition.update(competition);
    return await this.competitionModel.findById(id).populate('competitors');
  }

  async updateParticipant(id: string, userId: any, status: string): Promise<Competition> {
    const competition: Competition = await this.competitionModel.findById(id);
    if (!competition.competitors.includes(userId)) {
      throw new HttpException(
        "You're not in this competition yet!",
        HttpStatus.NOT_FOUND,
      )
    }
    competition.competitors.map(x => {
      if(x.competitor = userId){
        x.status = competitorStatus[status];
      }
      return x;
    });
    await competition.update(competition);
    return await this.competitionModel.findById(id).populate('competitors');
  }

  async updateParticipants(id: string, entries: [UpdateCompetitorDTO]): Promise<Competition> {
    const competition: Competition = await this.competitionModel.findById(id);
    entries.forEach(element => {
      competition.competitors.map(x => {
        if(x.competitor = element.competitor){
          x.status = element.status;
        }
        return x;
      });
    });
    await competition.update(competition);
    return await this.competitionModel.findById(id).populate('competitors');
  }
}
