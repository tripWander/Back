import dotenv from "dotenv";

dotenv.config();

export const accessTokenSecret = process.env["ACCESS_TOKEN_SECRET"];
export const accessTokenExpires = process.env["ACCESS_TOKEN_EXPIRES"];
export const port = process.env["PORT"];
export const env = process.env["NODE_ENV"] || "development";