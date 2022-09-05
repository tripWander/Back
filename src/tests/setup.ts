// Example
import dataSource from "../db";
import * as dotenv from 'dotenv'

beforeAll(async () => {
  dotenv.config();
  if (process.env.USE_TYPEORM==='true') {
    const connection = await dataSource.initialize();
  }

});

afterAll(async () => {
  dotenv.config();
  if (process.env.USE_TYPEORM==='true') {
   await dataSource.close();
  }

});