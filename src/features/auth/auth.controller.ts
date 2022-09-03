import authService from '@src/features/auth/auth.service';
import { loginSchema, registerSchema } from '@src/features/auth/auth.validations';
import { Request, Response } from 'express';
import { LoginDTO, RegisterDTO } from './auth.dto';

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { error, value } = loginSchema.validate({
    email: email,
    password: password,
  });
  const loginData = new LoginDTO(email, password);
  if (!error) {
    res.send(`success ${loginData.email}  ${loginData.password}`);
  } else {
    res.status(403).send('Bad requests');
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, age, firstName, lastName } = req.body;
  const { error, value } = registerSchema.validate({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    age: age,
  });
  const registerData = new RegisterDTO(email, password, firstName, lastName, age);
  if (!error) {
    const result = await authService.register(registerData);
    res.send(`user was ${result.email}  ${result.password}`);
  } else {
    res.status(403).send('Bad requests');
  }
};

export default { register, login };
