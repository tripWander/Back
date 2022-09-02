import { Request, Response } from 'express';
import { loginSchema } from './auth.validations';
import { LoginDTO } from './auth.dto';

const login = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const { error, value } = loginSchema.validate({
    email: body.email,
    password: body.password,
  });
  if (error) {
    res.status(403).send(error.details);
  } else {
    const loginDto = new LoginDTO(body.email, body.password);
    res.send(`success ${loginDto.email}  ${loginDto.password}`);
  }
};

export default { login };
