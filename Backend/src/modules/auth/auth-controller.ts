import { NextFunction, Request, Response } from "express";
import {
  IForgotPasswordBody,
  IResetPasswordBody,
  ISignInBody,
  ISignUpBody,
  IVerifyOtpBody,
} from "../../types/user.types";
import {
  signUpUser,
  signInUser,
  fetchAllUser,
  forgotPasswordService,
  resetPasswordService,
  logoutService,
  refreshTokenService,
  verifyOtpService
} from "./auth-services";
import { SUCCESS_MESSAGE } from "../../constants/successMessages";
import { OutputHandler } from "../../middleware/outputHandler";
import { customError } from "../../utils/customError";
import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  
  
  try {
    const body: ISignUpBody = req.body;

    const { accessToken, user } = await signUpUser(body, res);
    (res as any).result = {
      data: { user, accessToken },
      message: SUCCESS_MESSAGE.USER_CREATED,
    };

    OutputHandler(STATUS_CODE.CREATED, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: ISignInBody = req.body;

    const { accessToken, user } = await signInUser(body, res);

    (res as any).result = {
      data: { user, accessToken },
      message: SUCCESS_MESSAGE.LOGIN_SUCCESSFUL,
    };

    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};

export const getAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    (res as any).result = { data: user };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (res as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;
    OutputHandler(status, req, res, next);
  }
};

export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.refreshToken;
    await logoutService(token, res);
    (res as any).result = {
      data: null,
      message: SUCCESS_MESSAGE.LOGOUT_SUCCESSFUL,
    };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    OutputHandler(status, req, res, next);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new customError(ERROR_MESSAGE.USERID_NOT_FOUND, STATUS_CODE.UNAUTHORIZED));
    }

    const user = await fetchAllUser(userId);

    (res as any).result = { data: user, message: "Request Successfull" };
    OutputHandler(200, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: IForgotPasswordBody = req.body;

    await forgotPasswordService(data);

    (res as any).result = { data: null, message: SUCCESS_MESSAGE.OTP_SENT };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};

export const verifyOtp = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const data :IVerifyOtpBody = req.body;
    const result =await verifyOtpService(data);

      (res as any).result = {
      data: {resetToken:result.resetToken}, 
      message: SUCCESS_MESSAGE.OTP_VERIFIED,
    };
    OutputHandler(STATUS_CODE.OK, req, res, next);

  } catch (error) {
       const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
}



export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: IResetPasswordBody = req.body;

    await resetPasswordService(data);

    (res as any).result = {
      data: null,
      message: SUCCESS_MESSAGE.PASSWORD_RESET_SUCCESS,
    };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};


export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.refreshToken;

    const { accessToken } = await refreshTokenService(token);

    (res as any).result = {
      data: { accessToken: accessToken },
      message: "Token is Refreshed",
    };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};
