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

export interface User extends Document {
  email: string;
  readonly password: string;
  seller: boolean;
  address: Address;
  created: Date;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  seller?: boolean;
  address?: Address;
}

export interface Payload {
  email: string;
  iat?: number;
  expiresIn?: string;
}
