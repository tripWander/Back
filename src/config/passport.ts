import fs from "fs";
import { PassportStatic } from "passport";
import path from "path";
import { ExtractJwt, Strategy } from "passport-jwt";

import dataSource from "@/db";
import { User } from "@/entity/User";


const pathToKey = path.join(__dirname, "..", "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"]
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await dataSource.getRepository(User).findOneBy({ id: payload.sub });
    return user ? done(null, user) : done(null, false);
  } catch (error) {
    return done(error, null);
  }
});

const jwtAdminStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await dataSource.getRepository(User).findOneBy({ id: payload.sub });
    return user ? done(null, user) : done(null, false);
  } catch (error) {
    return done(error, null);
  }
});

const jwtOwnerStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await dataSource.getRepository(User).findOneBy({ id: payload.sub });
    return user ? done(null, user) : done(null, false);
  } catch (error) {
    return done(error, null);
  }
});

export default (passport: PassportStatic) => {
  passport.use("jwt", jwtStrategy);
  passport.use("jwtAdmin", jwtAdminStrategy);
  passport.use("jwtOwner", jwtOwnerStrategy);
};