import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { dataSource } from "../../services/database";
import logger from "../../utilities/logger";
import { _response } from "../../utilities/responseHandler";

export const pingServer = async (_: Request, res: Response) => {
  logger.info("Pinging server");

  // check connection to database
  await dataSource.query("SELECT 1");

  return _response(res, StatusCodes.OK, {});
};
