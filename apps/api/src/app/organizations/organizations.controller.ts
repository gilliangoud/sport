import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Put,
  Param
} from '@nestjs/common';
import { Organization } from './organizations.interface';
import { OrganizationsService } from './organizations.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../utilities/user.decorator';
import { User as UserDocument, CreateOrgDTO } from '@goud-sport/api-interface';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource: 'organization',
    action: 'read',
    possession: 'any'
  })
  async listAll(): Promise<Organization[]> {
    return await this.organizationsService.findAll();
  }

  @Get('mine')
  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource: 'organization',
    action: 'read',
    possession: 'own'
  })
  async listOwn(): Promise<Organization[]> {
    // TODO return all organizations a User belongs to
    return await this.organizationsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource: 'organization',
    action: 'create',
    possession: 'own'
  })
  async create(
    @Body() org: CreateOrgDTO,
    @User() user: UserDocument
  ): Promise<Organization> {
    return await this.organizationsService.create(org, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource: 'organization',
    action: 'update',
    possession: 'own'
  })
  async updateOwn(
    @Param('id') id: string,
    @Body() org: Partial<CreateOrgDTO>,
    @User() user: UserDocument
  ): Promise<Organization> {
    const { id: userId } = user;
    return await this.organizationsService.update(id, org, userId);
  }

  @Put(':id')
  // TODO use a different endpoint here, idk what yet tho
  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource: 'organization',
    action: 'update',
    possession: 'any'
  })
  async updateAny(
    @Param('id') id: string,
    @Body() org: Partial<CreateOrgDTO>
  ): Promise<Organization> {
    return await this.organizationsService.update(id, org);
  }

  // TODO return a joinDTO with confirmation instead of the whole org object
  @Put(':id')
  @UseGuards(AuthGuard())
  async joinOrg(
    @Param('id') id: string,
    @Body() userDocument: Partial<UserDocument>,
    @User() user: UserDocument
  ): Promise<Organization> {
    const { id: userId } = user;
    return await this.organizationsService.addMember(id, userDocument, userId);
  }
}
