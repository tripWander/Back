import fs from "fs";
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

const jWTStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await dataSource.getRepository(User).findOneBy({ id: payload.sub });
    return user ? done(null, user) : done(null, false);
  } catch (error) {
    return done(error, null);
  }
});

export default jWTStrategy;