import { Request, Response, NextFunction } from "express";
import { customError } from "../utils/customError";
import { ERROR_MESSAGE } from "../constants/errorMessages";

export const roleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

 
  if (!user) {
    return next(new customError(ERROR_MESSAGE.UNAUTHORIZED, 401));
  }

  if (user.role !== "admin") {
    return next(new customError(ERROR_MESSAGE.ADMIN_ACCESS, 403));
  }

  next();
};
