import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
});
