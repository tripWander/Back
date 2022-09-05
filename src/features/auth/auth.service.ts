import UserDao from '@src/features/users/user.dao';
import { PromiseResult } from '@src/types/genericTypes';
import { generateAccessToken } from '@src/utils/token';
import { evolve } from 'fp-ts/struct';
import { pipe } from 'fp-ts/function';
import { User } from '@src/entity/User';
import { LoginDTO, LoginResponseDTO, RegisterDTO } from '@src/features/auth/auth.dto';
import { hashPassword, isPasswordValid } from '@src/utils/hashing';

const login = async (loginData: LoginDTO): PromiseResult<Error, LoginResponseDTO> => {
  const user = await UserDao.findUserByEmail(loginData.email);
  if (user instanceof Error) {
    return new Error('user not found');
  }
  const isPassValid = isPasswordValid(loginData.password, user.password);
  if (!isPassValid) {
    return new Error('password is not valid');
  }
  const accessToken = await generateAccessToken(loginData.email, user.id);
  return new LoginResponseDTO(accessToken, user.id);
};

const register = async (registerData: RegisterDTO): PromiseResult<Error, User> => {
  const user = await UserDao.findUserByEmail(registerData.email);
  if (user instanceof User) {
    return;
  }

  const newRegister: RegisterDTO = pipe(
    registerData,
    evolve({
      password: hashPassword,
      firstName: (v) => v,
      lastName: (v) => v,
      email: (v) => v,
      age: (v) => v,
    }),
  );

  return await UserDao.register(newRegister);
};

export default {
  login,
  register,
};
