import express from 'express';
import { toPairs } from 'ramda';
import 'reflect-metadata';
import { dataSource } from '@src/db';

import routes from './routes';

const app = express();

const port = 8080;

app.use(express.json());

toPairs(routes).forEach(([routePath, handler]) => {
  app.use(routePath, handler);
});

app.listen(port, () => {
  dataSource.initialize();
  console.log('server started', port);
});
