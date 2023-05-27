import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
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
