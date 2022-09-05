import AuthService from '@src/features/auth/auth.service';
import authService from '@src/features/auth/auth.service';
import { loginSchema, registerSchema } from '@src/features/auth/auth.validations';
import { Request, Response } from 'express';
import { LoginDTO, RegisterDTO } from './auth.dto';

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({
    email: email,
    password: password,
  });
  const loginData = new LoginDTO(email, password);
  if (error) {
    res.status(400).send('Bad requests');
    return;
  }
  const result = await AuthService.login(loginData);
  if (result instanceof Error) {
    res.status(400).send(result.message);
    return;
  }
  res.send(result);
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

  if (error) {
    res.status(400).send('Bad requests');
    return;
  }
  const registerData = new RegisterDTO(email, password, firstName, lastName, age);
  const result = await authService.register(registerData);
  if (result instanceof Error) {
    res.status(400).send(result.message);
    return;
  }
  res.send(result);
};

export default { register, login };
