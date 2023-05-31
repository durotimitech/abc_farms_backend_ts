require("dotenv").config();
import "express-async-errors";

import express from "express";
import cors from "cors";
import { NotFoundError } from "./utilities/errors";
import errorHandler from "./middlewares/errorHandler";
import { dataSource } from "./services/database";
import logger from "./utilities/logger";
import routeLogger from "./middlewares/routeLogger";
import routesHandler from "./middlewares/routes";
import authenticate from "./middlewares/authenticate";
import isAdmin from "./middlewares/isAdmin";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(routeLogger);
app.use(authenticate);
app.use(isAdmin);
app.use(routesHandler);

app.use((req, _) => {
  throw new NotFoundError("Could not find requested resource! " + req.path);
});

app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, async () => {
  try {
    await dataSource.initialize();
    logger.info(
      `Connected to the database, IsInitialized -> ${dataSource.isInitialized}`
    );
    logger.info(`Listening on port ${port}...`);
    logger.info("environment -> " + process.env.ENVIRONMENT);
  } catch (error) {
    logger.error({ error });
    process.exit(1);
  }
});

export default app
