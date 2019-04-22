import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { User } from '../utilities/user.decorator';
import { User as UserDocument, CreateCompetitionDTO } from '@goud-sport/api-interface';
import { CompetitionsService } from './competitions.service';
import { Competition } from './competitions.interface';

@Controller('competitions')
export class CompetitionsController {
  constructor(private competitionsService: CompetitionsService) {}

  @Post()
  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource: 'competition',
    action: 'create',
    possession: 'own'
  })
  async create(
    @Body() org: CreateCompetitionDTO,
    @User() user: UserDocument
  ): Promise<Competition> {
    return await this.competitionsService.create(org, user);
  }


}
