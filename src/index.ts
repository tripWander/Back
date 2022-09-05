import { port } from '@src/config/config';
import express from 'express';
import { toPairs } from 'ramda';
import 'reflect-metadata';
import dataSource from '@src/db';

import routes from './routes';

const app = express();

app.use(express.json());

toPairs(routes).forEach(([routePath, handler]) => {
  app.use(routePath, handler);
});

dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log('server started', port);
  });
});
