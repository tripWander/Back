import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entity/User';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
});

export default dataSource;
