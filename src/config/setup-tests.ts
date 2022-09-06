import path from 'path'
import dataSource from "@/db";
import * as dotenv from 'dotenv'

beforeAll(async () => {
  dotenv.config({path: path.resolve(__dirname, "../../.env.test")});
  if (process.env.USE_TYPEORM==='true') {
    await dataSource.initialize();
  }
});

afterAll(async () => {
  dotenv.config();
  if (process.env.USE_TYPEORM==='true') {
   await dataSource.dropDatabase()
  }

});