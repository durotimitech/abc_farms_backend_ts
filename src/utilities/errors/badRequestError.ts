import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return {
      success: false,
      statusCode: this.statusCode,
      data: {},
      meta: {
        error: this.message,
      },
    };
  }
}
