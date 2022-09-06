import express from "express";
import { toPairs } from "ramda";
import cors from 'cors'
import "reflect-metadata";

import morganMiddleware from "@/middlewares/morgan.middleware";
import routes from "./routes";

const app = express();

app.use(cors())
app.use(express.json());
app.use(morganMiddleware);

toPairs(routes).forEach(([routePath, handler]) => {
  app.use(routePath, handler);
});

export default app;
