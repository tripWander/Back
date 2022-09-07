import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken';

import { accessTokenExpires } from "@/config/env";
import { User } from "@/entity/User";


const pathToKey = path.join(__dirname, "..", "..", "id_rsa_priv.pem")
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

export const generateAccessToken = async (user: User) => {
  return jwt.sign(
    {
      sub: user.id,
      iat: Date.now()
    },
    PRIV_KEY,
    { expiresIn: accessTokenExpires, algorithm: "RS256" },
  );
};
