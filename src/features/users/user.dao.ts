import { User, userRepository } from '@src/entity/User';
import { RegisterDTO } from '@src/features/auth/auth.dto';
import { PromiseResult } from '@src/types/genericTypes';

const register = async (registerData: RegisterDTO): PromiseResult<Error, User> => {
  try {
    const user = await userRepository.create(registerData);
    return userRepository.save(user);
  } catch (error) {
    return error;
  }
};

const findUserById = async (userId: string): PromiseResult<Error, User> => {
  try {
    return userRepository.findOneBy({ id: userId });
  } catch (error) {
    return error;
  }
};

const findUserByEmail = async (email: string): PromiseResult<Error, User> => {
  try {
    return userRepository.findOneBy({ email });
  } catch (error) {
    return error;
  }
};

export default {
  register,
  findUserById,
  findUserByEmail,
};
