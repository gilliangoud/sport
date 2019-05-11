import { Controller, Post, UseGuards, Body, Param, Get, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { User } from '../utilities/user.decorator';
import { User as UserDocument, CreateCompetitionDTO, UpdateCompetitionDTO, UpdateCompetitorDTO } from '@goud-sport/api-interface';
import { CompetitionsService } from './competitions.service';
import { Competition } from './competitions.interface';

@Controller('competitions')
export class CompetitionsController {
  constructor(private competitionsService: CompetitionsService) {}

  @Get()
  async listAll(): Promise<Competition[]> {
    return await this.competitionsService.findAll();
  }

  // @Get('/mine')
  // @UseGuards(AuthGuard)
  // async listMine(@User() user: UserDocument): Promise<PersonalCompetitionDTO[]> {
  //   const { id } = user;
  //   return await this.competitionsService.findByOwner(id);
  // }

  @Get(':id')
  async read(@Param('id') id: string): Promise<Competition> {
    return await this.competitionsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() competition: CreateCompetitionDTO,
    @User() user: UserDocument
  ): Promise<Competition> {
    return await this.competitionsService.create(competition, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() competition: Partial<UpdateCompetitionDTO>,
    @User() user: UserDocument,
  ): Promise<Competition> {
    return await this.competitionsService.update(id, competition);
  }


  @Post(':id/enter')
  @UseGuards(AuthGuard)
  async enterCompetition(
    @Param('id') id: string,
    //@Body() userDocument: Partial<UserDocument>,
    @User() user: UserDocument
  ): Promise<Competition> {
    const { id: userId } = user;
    return await this.competitionsService.addParticipant(id, userId);
  }

  @Put(':id/enter')
  @UseGuards(AuthGuard)
  async updateOwnEntry(
    @Param('id') id: string,
    @Body() status: string,
    //@Body() userDocument: Partial<UserDocument>,
    @User() user: UserDocument
  ): Promise<Competition> {
    const { id: userId } = user;
    return await this.competitionsService.updateParticipant(id, userId, status);
  }

  @Put(':id/enter')
  @UseGuards(AuthGuard)
  async updateEntries(
    @Param('id') id: string,
    @Body() entries: [UpdateCompetitorDTO],
    @User() user: UserDocument
  ): Promise<Competition> {
    const { id: userId } = user;
    return await this.competitionsService.updateParticipants(id, entries);
  }
}
