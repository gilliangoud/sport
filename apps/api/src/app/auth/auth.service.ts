import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Payload } from '@goud-sport/api-interface';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signPayload(payload: Payload) {
    // TODO add expires-in variable
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.usersService.findByPayload(payload);
  }
}
