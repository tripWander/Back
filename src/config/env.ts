import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envVarsSchema = joi.object()
  .keys({
    NODE_ENV: joi.string().valid("production", "development", "test")
      .required(),
    PORT: joi.number().positive().required(),
    ACCESS_TOKEN_SECRET: joi.string().required(),
    ACCESS_TOKEN_EXPIRES: joi.number().positive().required()
  })
  .unknown();

const {
  error
} = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if(error){
  throw Error(`Config validation error: ${error.message}`)
}

export const accessTokenSecret = process.env["ACCESS_TOKEN_SECRET"];
export const accessTokenExpires = process.env["ACCESS_TOKEN_EXPIRES"];
export const port = process.env["PORT"];
export const env = process.env["NODE_ENV"];