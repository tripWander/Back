import { accessTokenExpires, accessTokenSecret } from '@src/config/config';
import jwt from 'jsonwebtoken';

export const generateAccessToken = async (email: string, id: string) => {
  return jwt.sign(
    {
      email,
      id,
    },
    accessTokenSecret || 'secret',
    { expiresIn: accessTokenExpires },
  );
};
