import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError";

export class ConflictError extends CustomError {
  statusCode = StatusCodes.CONFLICT;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
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
