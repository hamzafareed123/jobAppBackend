import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { IUserDocument, User } from "../../models/user-models";
import {
  IAuthResponse,
  IForgotPasswordBody,
  IResetPasswordBody,
  ISignInBody,
  ISignUpBody,
  IUser,
} from "../../types/user.types";
import bcrypt from "bcrypt";
import { mapUser } from "../../utils/mapUser";
import {
  findUserByEmail,
  createUser,
  findAllUser,
  saveUserOTP,
  resetUserPassword,
  findUserByOTP,
  deleteRefreshToken,
} from "./auth-repositories";
import { customError } from "../../utils/customError";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken";
import { Response } from "express";
import { sendOTPEmail } from "../../email/sendEmail";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";
import { findRefreshToken } from "./auth-repositories";

export const signUpUser = async (
  body: ISignUpBody,
  res: Response,
): Promise<IAuthResponse> => {
  const { fullName, email, password } = body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new customError(ERROR_MESSAGE.USER_ALREADY_EXIST, 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await createUser({
    fullName,
    email,
    password: hashPassword,
  });

  const accessToken = generateAccessToken(newUser._id.toString());

  await generateRefreshToken(newUser._id.toString(), res);
  return { accessToken, user: mapUser(newUser) };
};

export const signInUser = async (body: ISignInBody, res: Response) => {
  const { email, password } = body;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new customError(ERROR_MESSAGE.INVALID_CREDENTIALS, 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new customError(ERROR_MESSAGE.INVALID_CREDENTIALS, 401);
  }

  const accessToken = generateAccessToken(user._id.toString());
  await generateRefreshToken(user._id.toString(), res);

  return { accessToken, user: mapUser(user) };
};

export const fetchAllUser = async (userId: string): Promise<IUser[]> => {
  const allUsers = await findAllUser(userId);

  if (!allUsers || allUsers.length === 0) {
    throw new customError(ERROR_MESSAGE.USER_NOT_FOUND, 404);
  }

  return allUsers.map((user) => mapUser(user));
};

export const forgotPasswordService = async (
  data: IForgotPasswordBody,
): Promise<void> => {
  const { email } = data;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new customError(ERROR_MESSAGE.USER_NOT_FOUND, 404);
  }

  const otp = await saveUserOTP(email);
  await sendOTPEmail(email, otp);
};

export const resetPasswordService = async (
  data: IResetPasswordBody,
): Promise<void> => {
  const { otp, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    throw new customError("Confirm password Not Match", 400);
  }

  const user = await findUserByOTP(otp);

  if (!user) {
    throw new customError(ERROR_MESSAGE.INVALID_OR_EXPIRED_OTP, 404);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  await resetUserPassword(user._id.toString(), hashPassword);
};

export const refreshTokenService = async (
  token: string,
): Promise<{ accessToken: string }> => {
  if (!token) {
    throw new customError(ERROR_MESSAGE.NO_TOKEN_FOUND, 401);
  }

  const decode = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET) as {
    userId: string;
  };
  if (!decode) throw new customError(ERROR_MESSAGE.NO_TOKEN_FOUND, 401);

  const storedToken = await findRefreshToken(token);
  if (!storedToken) throw new customError("Invalid Refresh Token", 401);

  const accessToken = generateAccessToken(decode.userId);
  return { accessToken };
};

export const logoutService = async (
  userId: string,
  res: Response,
): Promise<void> => {
  await deleteRefreshToken(userId);

  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
};
