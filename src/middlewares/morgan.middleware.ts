import morgan from "morgan";

import { env } from "@/config/env";
import logger from "@/config/winston";


const stream = {
  write: (message) => logger.http(message)
};

const skip = ()=>{
  return env !== "development"
}

export default morgan(
  { stream, skip }
)
