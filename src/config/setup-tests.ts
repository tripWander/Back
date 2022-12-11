import { GenericContainer } from "testcontainers";

import { dbName, dbPort, dbUsername } from "@/config/env";
import dataSource from "@/db";


beforeAll(async () => {
  await dataSource.initialize();
});


const setupTestPostgres = async () => {
  return await new GenericContainer("postgres")
    .withExposedPorts(dbPort)
    .withEnv("POSTGRES_USER", dbUsername)
    .withEnv("POSTGRES_DB", dbName)
    .start();
};