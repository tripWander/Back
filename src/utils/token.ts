import jwt from 'jsonwebtoken';

import { accessTokenExpires, accessTokenSecret } from '@/config/config';

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
