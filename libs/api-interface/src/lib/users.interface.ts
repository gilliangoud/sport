import { Document } from 'mongoose';
import { IsString } from 'class-validator';

export interface Address {
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

export interface Athlete {
  represents: [{
    sport: string,
    organization: string
  }];

}

export interface User extends Document {
  email: string;
  readonly password: string;
  readonly salt: string;
  readonly gender: string;
  bio: string;
  address: Address;
  athlete: Athlete;
  readonly admin: boolean;
  name: {
    first: string,
    middle: string,
    last: string
  }
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  address?: Address;
}

export interface Payload {
  email: string;
  iat?: number;
  expiresIn?: string;
}
