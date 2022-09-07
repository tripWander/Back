import jWTStrategy from "@/config/passport";
import express from "express";
import { toPairs } from "ramda";
import cors from 'cors'
import passport from "passport";
import "reflect-metadata";

import morganMiddleware from "@/middlewares/morgan.middleware";
import routes from "./routes";

const app = express();

app.use(cors())
app.use(express.json());
app.use(morganMiddleware);

passport.use(jWTStrategy)
passport.initialize()

toPairs(routes).forEach(([routePath, handler]) => {
  app.use(routePath, handler);
});

export default app;
