import express from 'express';
import { toPairs } from 'ramda';
import 'reflect-metadata';

import routes from './routes';

const app = express();

app.use(express.json());

toPairs(routes).forEach(([routePath, handler]) => {
  app.use(routePath, handler);
});

export default app;
