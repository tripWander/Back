import morgan, { StreamOptions } from "morgan";

import { env } from "@/config/env";
import logger from "@/config/winston";

const stream = {
  write: (message: any) => logger.http(message)
};

const skip = () => {
  return env !== "development";
};


export default morgan("common",
  { stream, skip }
);