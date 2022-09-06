import { omit } from "ramda";

import { BaseError } from "@/utils/errors";
import { PaginatedResponse } from "@/types/generalResponses";
import { PromiseResult } from "@/types/genericTypes";
import UsersDao from "./users.dao";
import { UserResponseT, UsersQuery } from "./users.dto";

const getUsers = async (
  usersQuery: UsersQuery
): PromiseResult<BaseError, PaginatedResponse<UserResponseT>> => {
  const usersResult = await UsersDao.getUsers(usersQuery);
  if (usersResult instanceof BaseError) return usersResult;

  usersResult.items.map((user) => omit(["password"], user));
  return usersResult;
};

const getUser = async (userId: string): PromiseResult<BaseError, UserResponseT> => {
  return UsersDao.findUserById(userId);
};

const deleteUser = async (userId: string): PromiseResult<BaseError, string> => {
  return UsersDao.deleteUser(userId);
};

export default {
  getUsers,
  getUser,
  deleteUser
};
