import { BaseError } from "@/utils/errors";
import { Like } from "typeorm";

import dataSource from "@/db";
import { User } from "@/entity/User";
import { RegisterDTO } from "@/features/auth/auth.dto";
import { PaginatedResponse } from "@/types/generalResponses";
import { PromiseResult } from "@/types/genericTypes";
import { UsersQuery } from "./users.dto";

const register = async (registerData: RegisterDTO): PromiseResult<BaseError, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.create(registerData);
    return userRepository.save(user);
  } catch (error) {
    return new BaseError(error.message || "Failed to register user", 500);
  }
};

const getUsers = async (usersQuery: UsersQuery): PromiseResult<BaseError, PaginatedResponse<User>> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const [result, total] = await userRepository.findAndCount({
      take: usersQuery.limit,
      skip: usersQuery.limit * usersQuery.page,
      where: { email: Like(`%${usersQuery.email}%`) },
      order: { updatedAt: "DESC" }
    });
    return new PaginatedResponse<User>(total, result);
  } catch (error) {
    return new BaseError(error.message || "Failed to get users", 500);
  }
};

const findUserById = async (userId: string): PromiseResult<BaseError, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return new BaseError("User was not found", 404);
    return user;
  } catch (error) {
    return new BaseError(error.message || "Failed to find user", 500);
  }
};

const findUserByEmail = async (email: string): PromiseResult<BaseError, User> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOneBy({ email });
    if (!user) return new BaseError("user was not found", 404);
    return user;
  } catch (error) {
    return new BaseError(error.message || "Failed to find user", 500);
  }
};

const deleteUser = async (userId: string): PromiseResult<BaseError, string> => {
  const userRepository = dataSource.getRepository(User);
  try {
    const user = await findUserById(userId);
    if (user instanceof BaseError) return user;
    await userRepository.remove(user);
    return "success";
  } catch (error) {
    return new BaseError(error.message || "user was not deleted", 500);
  }
};

export default {
  register,
  getUsers,
  findUserById,
  findUserByEmail,
  deleteUser
};
