import { Like } from 'typeorm';

import dataSource from '@/db';
import { User } from '@/entity/User';
import { RegisterDTO } from '@/features/auth/auth.dto';
import { PaginatedResponse } from '@/types/generalResponses';
import { PromiseResult } from '@/types/genericTypes';
import { UsersQuery } from './users.dto';

const register = async (registerData: RegisterDTO): PromiseResult<Error, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.create(registerData);
    return userRepository.save(user);
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error('Failed to register user');
  }
};

const getUsers = async (usersQuery: UsersQuery): PromiseResult<Error, PaginatedResponse<User>> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const [result, total] = await userRepository.findAndCount({
      take: usersQuery.limit,
      skip: usersQuery.limit * usersQuery.page,
      where: { email: Like(`%${usersQuery.email}%`) },
      order: { updatedAt: 'DESC' },
    });
    return new PaginatedResponse<User>(total, result);
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error('Failed to get users');
  }
};

const findUserById = async (userId: string): PromiseResult<Error, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return new Error('user was not found');
    return user;
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error('Failed to find user');
  }
};

const findUserByEmail = async (email: string): PromiseResult<Error, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOneBy({ email });
    if (!user) return new Error('user was not found');
    return user;
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error('Failed to find user');
  }
};

const deleteUser = async (userId: string): PromiseResult<Error, string> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await findUserById(userId);
    if (user instanceof Error) {
      return new Error('user was not found');
    }
    await userRepository.remove(user);
    return 'success';
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error('user was not deleted');
  }
};

export default {
  register,
  getUsers,
  findUserById,
  findUserByEmail,
  deleteUser,
};
