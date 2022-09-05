import dataSource from '@src/db';
import { Like } from 'typeorm';
import { User } from '@src/entity/User';
import { RegisterDTO } from '@src/features/auth/auth.dto';
import { UsersQuery } from '@src/features/users/users.dto';
import { PaginatedResponse } from '@src/types/generalResponses';
import { PromiseResult } from '@src/types/genericTypes';

const register = async (registerData: RegisterDTO): PromiseResult<Error, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.create(registerData);
    return userRepository.save(user);
  } catch (error) {
    return error;
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
    return error;
  }
};

const findUserById = async (userId: string): PromiseResult<Error, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    return userRepository.findOneBy({ id: userId });
  } catch (error) {
    return error;
  }
};

const findUserByEmail = async (email: string): PromiseResult<Error, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    return userRepository.findOneBy({ email });
  } catch (error) {
    return error;
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
    return error;
  }
};

export default {
  register,
  getUsers,
  findUserById,
  findUserByEmail,
  deleteUser,
};
