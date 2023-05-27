import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError";

export class UnauthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  errorMsg?: string;

  constructor(message: string, errorMsg?: string) {
    super(message);
    this.errorMsg = errorMsg;

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return {
      success: false,
      statusCode: this.statusCode,
      data: {},
      meta: {
        error: this.message,
        errorMsg: this.errorMsg,
      },
    };
  }
}
