import 'reflect-metadata';
import { dbName } from "@/config/env";
import { DataSource } from 'typeorm';

import { User } from "@/entity/User";


const dataSource = new DataSource({
  type: 'sqlite',
  database: dbName,
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
});

export default dataSource;
