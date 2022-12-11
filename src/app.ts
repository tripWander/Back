import jWTStrategy from "@/config/passport";
import express from "express";
import { toPairs, forEach, pipe } from "ramda";
import cors from "cors";
import passport from "passport";
import "reflect-metadata";

import morganMiddleware from "@/middlewares/morgan.middleware";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

jWTStrategy(passport);
passport.initialize();

pipe(
  toPairs,
  forEach(([routePath, handler]: [string, any]) => {
    app.use(routePath, handler);
  })
)(routes);

export default app;
