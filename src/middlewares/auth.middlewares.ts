import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Response, NextFunction } from "express";

import { IRequest } from "@/types/request";

const pathToKey = path.join(__dirname, "..", "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

function authMiddleware(req: IRequest, res: Response, next: NextFunction) {
  const tokenParts = req.headers.authorization.split(" ");

  if (tokenParts[0] === "Bearer" && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {

    try {
      const verification = jwt.verify(tokenParts[1], PUB_KEY, { algorithms: ["RS256"] });
      req.jwt = verification;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        msg: "You are not authorized to visit this route"
      });
    }

  } else {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to visit this route"
    });
  }
}

const passportBaseJWT = passport.authenticate("jwt", { session: false });

export { authMiddleware, passportBaseJWT };