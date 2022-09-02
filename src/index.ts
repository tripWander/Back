import express from 'express';
import { toPairs } from 'ramda';
import 'reflect-metadata';
import { AppDataSource } from '@src/db';

import routes from './routes';

const app = express();

const port = 8080;

app.use(express.json());

toPairs(routes).forEach(([routePath, handler]) => {
  app.use(routePath, handler);
});

app.listen(port, () => {
  AppDataSource.initialize();
  console.log('server started', port);
});
