import * as E from 'fp-ts/Either';
import { dataSource } from '@src/db';
import { User } from '@src/entity/User';
import { LoginDTO, RegisterDTO } from './auth.dto';

const login = async (loginData: LoginDTO) => {};

const register = async (registerData: RegisterDTO): Promise<E.Either<any, User>> => {
  try {
    const user = await dataSource.getRepository(User).create(registerData);
    const result = await dataSource.getRepository(User).save(user);
    return E.right(result);
  } catch (error) {
    return E.left(error);
  }
};

export default {
  register,
  login,
};
