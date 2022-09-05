import { omit } from 'ramda';

import { PaginatedResponse } from '@/types/generalResponses';
import { PromiseResult } from '@/types/genericTypes';
import UsersDao from './users.dao';
import { UserResponseT, UsersQuery } from './users.dto';

const getUsers = async (
  usersQuery: UsersQuery,
): PromiseResult<Error, PaginatedResponse<UserResponseT>> => {
  const usersResult = await UsersDao.getUsers(usersQuery);
  if (usersResult instanceof Error) {
    return usersResult;
  }
  usersResult.items.map((user) => omit(['password'], user));
  return usersResult;
};

const getUser = async (userId: string): PromiseResult<Error, UserResponseT> => {
  return UsersDao.findUserById(userId);
};

const deleteUser = async (userId: string): PromiseResult<Error, string> => {
  return UsersDao.deleteUser(userId);
};

export default {
  getUsers,
  getUser,
  deleteUser,
};
