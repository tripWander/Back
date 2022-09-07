import "reflect-metadata";
import {
  dbHost,
  dbName,
  dbPassword,
  dbPort,
  dbUsername,
} from "@/config/env";
import { DataSource } from "typeorm";

import { User } from "@/entity/User";

const dataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: []
});

export default dataSource;
