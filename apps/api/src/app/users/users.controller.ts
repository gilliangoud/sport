import { Controller, UseGuards, Put, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../utilities/user.decorator';
import { UsersService } from './users.service';
import { User as UserDocument } from '@goud-sport/api-interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() userDocument: Partial<UserDocument>,
    @User() user: UserDocument,
  ): Promise<UserDocument> {
    const { id: userId } = user;
    return await this.usersService.update(id, userDocument, userId);
  }
}
