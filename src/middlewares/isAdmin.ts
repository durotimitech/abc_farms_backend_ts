import { NextFunction, Response } from "express";
import { UnAuthenticatedError } from "../utilities/errors";
import { UserRoleTypes } from "../api/entities";

const isAdmin = async (req: any, _: Response, next: NextFunction) => {
  const auth_paths_GET = ["/api/users", "/api/users/admin"] as string[]
  const auth_paths_POST = ["/api/products"] as string[]

  if (req.method == "GET" && auth_paths_GET.includes(req.path)) {
    if (req?.userData?.role !== UserRoleTypes.ADMIN){
       throw new UnAuthenticatedError(
        "You are not authorized to view this route.",
        "You are not authorized to view this route."
      );
    }
    next();
  } else if (req.method == "POST" && auth_paths_POST.includes(req.path)) {
    if (req?.userData?.role !== UserRoleTypes.ADMIN){
        throw new UnAuthenticatedError(
        "You are not authorized to view this route.",
        "You are not authorized to view this route."
      );
    }}
   else {
    next();
  }
};

export default isAdmin;
