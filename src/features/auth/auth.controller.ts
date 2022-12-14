import { Request, Response } from "express";

import { BaseError } from "@/utils/errors";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import AuthService from "./auth.service";
import { loginSchema, registerSchema } from "./auth.validations";


const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({
    email: email,
    password: password
  });
  const loginData = new LoginDTO(email, password);
  if (error) {
    res.status(400).send("Bad requests");
    return;
  }
  const result = await AuthService.login(loginData);
  if (result instanceof BaseError) {
    res.status(result.statusCode).send(result.message);
    return;
  }
  res.send(result);
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, age, firstName, lastName } = req.body;
  const { error } = registerSchema.validate({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    age: age
  });

  if (error) {
    res.status(400).send("Bad requests");
    return;
  }
  const registerData = new RegisterDTO(email, password, firstName, lastName, age);
  const result = await AuthService.register(registerData);
  if (result instanceof BaseError) {
    res.status(result.statusCode).send(result.message);
    return;
  }
  res.send(result);
};

export default { register, login };
