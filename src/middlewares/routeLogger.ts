import {  Response, NextFunction } from "express";
import logger from "../utilities/logger";

const routeLogger = (req: any, _: Response, next: NextFunction) => {
  logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  logger.info(
    `${req?.userData?.email || "anon"} is making a ${req.method} Request to ${
      req.path
    }`
  );
  logger.info("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  next();
};

export default routeLogger;
