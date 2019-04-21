import { Controller, Get, Post, UseGuards, Body, Put, Param } from '@nestjs/common';
import { Organization } from './organizations.interface';
import { OrganizationsService } from './organizations.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../utilities/user.decorator';
import { User as UserDocument, CreateOrgDTO } from '@goud-sport/api-interface';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  async listAll(): Promise<Organization[]> {
    return await this.organizationsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() org: CreateOrgDTO,
    @User() user: UserDocument,
  ): Promise<Organization> {
    return await this.organizationsService.create(org, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() org: Partial<CreateOrgDTO>,
    @User() user: UserDocument,
  ): Promise<Organization> {
    const { id: userId } = user;
    return await this.organizationsService.update(id, org, userId);
  }

  // TODO return a joinDTO with confirmation instead of the whole org object
  @Put(':id')
  @UseGuards(AuthGuard())
  async joinOrg(
    @Param('id') id: string,
    @Body() userDocument: Partial<UserDocument>,
    @User() user: UserDocument,
  ): Promise<Organization> {
    const { id: userId } = user;
    return await this.organizationsService.addMember(id, userDocument, userId);
  }


}
