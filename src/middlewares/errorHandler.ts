import { Response, NextFunction, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../utilities/errors";
import logger from "../utilities/logger";

const errorHandler = async (
  err: Error,
  // @ts-ignore
  req: Request,
  res: Response,
  _: NextFunction
) => {
  logger.error({ err });

  if (err instanceof CustomError) {

    return res.status(err.statusCode).json(err.serializeErrors());
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    data: {},
    meta: {
      error: "Something went wrong...",
    },
  });
};

export default errorHandler;
