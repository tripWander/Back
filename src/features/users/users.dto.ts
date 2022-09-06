import { User } from '@/entity/User';

export class UsersQuery {
  age?: number;

  constructor(public page: number, public limit: number, age?: string, public email?: string) {
    this.age = Number(age);
  }
}

export type UserResponseT = Partial<Omit<User, 'password'>>;
