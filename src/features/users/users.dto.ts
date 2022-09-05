import { User } from '@/entity/User';

export class UsersQuery {
  age?: number;

  constructor(public page: number, public limit: number, age?: string, public email?: string) {
    this.age = Number(age);
  }
}

export type UserResponseT = Partial<Omit<User, 'password'>>;

// export class UserResponse implements UserResponseT {
//   constructor(
//     public createdAt: Date,
//     public email: string,
//     public firstName: string,
//     public id: string,
//     public lastName: string,
//     public updatedAt: Date,
//     public age?: number,
//   ) {}
// }
