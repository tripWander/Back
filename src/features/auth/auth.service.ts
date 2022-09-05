import { omit } from "ramda";
import { evolve } from "fp-ts/struct";
import { pipe } from "fp-ts/function";

import UserDao from "@/features/users/users.dao";
import { UserResponseT } from "@/features/users/users.dto";
import { PromiseResult } from "@/types/genericTypes";
import { generateAccessToken } from "@/utils/token";
import { User } from "@/entity/User";
import { hashPassword, isPasswordValid } from "@/utils/hashing";
import { LoginDTO, LoginResponseDTO, RegisterDTO } from "./auth.dto";

const login = async (loginData: LoginDTO): PromiseResult<Error, LoginResponseDTO> => {
  const user = await UserDao.findUserByEmail(loginData.email);
  if (user instanceof Error) {
    return new Error("user not found");
  }
  const isPassValid = isPasswordValid(loginData.password, user.password);
  if (!isPassValid) {
    return new Error("password is not valid");
  }
  const accessToken = await generateAccessToken(loginData.email, user.id);
  return new LoginResponseDTO(accessToken, user.id);
};

const register = async (registerData: RegisterDTO): PromiseResult<Error, UserResponseT> => {
  const user = await UserDao.findUserByEmail(registerData.email);
  if (user instanceof User) {
    return new Error("User already exist");
  }

  const newRegister: RegisterDTO = pipe(
    registerData,
    evolve({
      password: hashPassword,
      firstName: (v) => v,
      lastName: (v) => v,
      email: (v) => v,
      age: (v) => v
    })
  );

  const newUser = await UserDao.register(newRegister);
  if (newUser instanceof Error) {
    return newUser;
  }
  return omit(["password"], newUser);
};

export default {
  login,
  register
};