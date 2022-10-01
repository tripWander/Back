import dataSource from "@/db";
import { BaseError } from "@/utils/errors";
import { User } from "@/entity/User";
import { RegisterDTO } from "@/features/auth/auth.dto";
import { PaginatedResponse } from "@/types/generalResponses";
import { PromiseResult } from "@/types/genericTypes";
import { UserResponseT, UsersQuery } from "./users.dto";

const register = async (registerData: RegisterDTO): PromiseResult<BaseError, User> => {
  try {
    const user = await dataSource.getRepository(User).create(registerData);
    return dataSource.getRepository(User).save(user);
  } catch (error) {
    return new BaseError(error.message || "Failed to register user", 500);
  }
};

const getUsers = async (usersQuery: UsersQuery): PromiseResult<BaseError, PaginatedResponse<UserResponseT>> => {
  const skip  = (usersQuery.page - 1) * usersQuery.limit
  console.log(skip, 'here', usersQuery.limit, usersQuery);
  try {
    const query = await dataSource.getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.email", "user.firstName", "user.lastName", "user.age"])
    if (usersQuery.age) {
      console.log('is here?')
      query.where("user.age = :age", { age: usersQuery.age });
    }
    if (usersQuery.email) {
      console.log('and email?')
      query.andWhere("user.email like :email", { email: `%${usersQuery.email}%` });
    }
    const total = await query.getCount();
    const result: UserResponseT[] = await query.skip(skip).take(usersQuery.limit).getMany();
    return new PaginatedResponse<UserResponseT>(total, result);
  } catch (error) {
    return new BaseError(error.message || "Failed to get users", 500);
  }
};

const findUserById = async (userId: string): PromiseResult<BaseError, User> => {
  try {
    const user = await dataSource.getRepository(User).findOneBy({ id: userId });
    if (!user) return new BaseError("User was not found", 404);
    return user;
  } catch (error) {
    return new BaseError(error.message || "Failed to find user", 500);
  }
};

const findUserByEmail = async (email: string): PromiseResult<BaseError, User> => {
  try {
    const user = await dataSource.getRepository(User).findOneBy({ email });
    const a = "hello_world";
    if (!user) return new BaseError("user was not found", 404);
    return user;
  } catch (error) {
    return new BaseError(error.message || "Failed to find user", 500);
  }
};

const deleteUser = async (userId: string): PromiseResult<BaseError, string> => {
  try {
    const user = await findUserById(userId);
    if (user instanceof BaseError) return user;
    await dataSource.getRepository(User).remove(user);
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
