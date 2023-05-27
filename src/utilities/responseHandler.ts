import { Response } from "express";
import logger from "./logger";

export const _response = (res: Response, statusCode: 200 | 201, data?: any) => {
  const response = {
    success: true,
    statusCode,
    data: data ? data : {},
    meta: { error: "" },
  };
  logger.info({ response });
  return res.status(statusCode).json(response);
};
