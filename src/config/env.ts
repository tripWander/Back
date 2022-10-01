import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envVarsSchema = joi.object()
  .keys({
    NODE_ENV: joi.string().valid("production", "development", "test")
      .required(),
    PORT: joi.number().positive().required(),
    ACCESS_TOKEN_EXPIRES: joi.string().required(),
    DB_NAME: joi.string().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    DB_PORT: joi.number().positive().required(),
    DB_HOST: joi.string().required()
  })
  .unknown();

const { error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  throw Error(`Config validation error: ${error.message}`);
}

export const accessTokenExpires = process.env["ACCESS_TOKEN_EXPIRES"];
export const port = process.env["PORT"];
export const env = process.env["NODE_ENV"];
export const dbHost = process.env["DB_HOST"];
export const dbPort = Number(process.env["DB_PORT"]);
export const dbName = process.env["DB_NAME"];
export const dbUsername = process.env["POSTGRES_USER"];
export const dbPassword = process.env["POSTGRES_PASSWORD"];
