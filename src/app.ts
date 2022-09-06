import express from "express";
import { toPairs } from "ramda";
import "reflect-metadata";

import morganMiddleware from "@/middlewares/morgan.middleware";
import routes from "./routes";

const app = express();

app.use(morganMiddleware);
app.use(express.json());

toPairs(routes).forEach(([routePath, handler]) => {
  app.use(routePath, handler);
});

export default app;
