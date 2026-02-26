import { NextFunction, Request, Response } from "express";
import { customError } from "../utils/customError";
import { ERROR_MESSAGE } from "../constants/errorMessages";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { findUserByID } from "../modules/auth/auth-repositories";
import { IUser } from "../types/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return next(new customError(ERROR_MESSAGE.NO_TOKEN_FOUND, 401));
    }

    const decode = jwt.verify(token, ENV.JWT_SECRET) as { userId: string };
    const user = await findUserByID(decode.userId);

    if (!user) {
      throw new customError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new customError(ERROR_MESSAGE.NO_TOKEN_FOUND, 401));
  }
};
