import { NextFunction, Response } from "express";
import { User } from "../api/entities/User";
import { UnauthorizedError } from "../utilities/errors";
import validateToken from "../utilities/validateToken";
import { dataSource } from "../services/database";

const authenticate = async (req: any, _: Response, next: NextFunction) => {
  const userRepository = dataSource.getRepository(User);
  // freePaths are routes not needing token authentication
  let freePaths = [
   
    // Users
    `/api/users/register`,
    `/api/users/login`,
    `/api/users/reset-password`,
  ];

  const authErrors = {
    noAuthHeader: "Please send an authorization header",
    invalidAuthToken:
      "Please send a valid authorization token. This token has expired/invalid",
    userNotFound: "Invalid User. Please log in",
  };

  if (freePaths.includes(req.path)) {
    next();
  } else if (!req.header("Authorization")) {
    throw new UnauthorizedError(
      authErrors.noAuthHeader,
      authErrors.noAuthHeader
    );
  } else {
    let token = req.header("Authorization");
    let _data = await validateToken(token!);
    if (_data == false) {
      throw new UnauthorizedError(
        authErrors.invalidAuthToken,
        authErrors.invalidAuthToken
      );
    } else {
      const user = await userRepository.findOne({
        where: { id: _data.user_id },
      });

      if (!user) {
        throw new UnauthorizedError(
          authErrors.userNotFound,
          authErrors.userNotFound
        );
      }

      req.userData = _data;
      next();
    }
  }
};

export default authenticate;
