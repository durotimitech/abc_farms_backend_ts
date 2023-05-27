import { NextFunction, Response } from "express";
import { UnAuthenticatedError } from "../utilities/errors";
import { UserRoleTypes } from "../api/entities";

const isSalesman = async (req: any, _: Response, next: NextFunction) => {
  const auth_paths_GET = ["/api/users/login"] as any

  if (req.method == "POST" && auth_paths_GET.includes(req.path)) {
    if (req?.userData?.role !== UserRoleTypes.ADMIN){
       throw new UnAuthenticatedError(
        "You are not authorized to view this route.",
        "You are not authorized to view this route."
      );
    }
    next();
  } else {
    next();
  }
};

export default isSalesman;
