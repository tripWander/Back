import { User } from '@src/entity/User';
import { RegisterDTO } from '@src/features/auth/auth.dto';
import AuthRepository from '@src/features/auth/auth.repository';

const login = async () => {
  return 'hello';
};

const register = async (registerData: RegisterDTO) => {
  return await AuthRepository.register(registerData);
};

export default {
  login,
  register,
};
