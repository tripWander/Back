import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerRouter = Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Planner API",
      version: "1.0.0",
      description: "API for travel planner applicaiton"
    },
    servers: [
      {
        url: "http://localhost:8080"
      }
    ],
  },
  apis: ["../**/*.routes.ts"]
};

const specs = swaggerJsDoc(options)

swaggerRouter.use("/", swaggerUI.serve, swaggerUI.setup(specs));

export default swaggerRouter;