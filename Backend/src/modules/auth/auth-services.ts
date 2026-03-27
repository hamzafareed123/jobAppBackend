import { ERROR_MESSAGE } from "../../constants/errorMessages";
import {
  IAuthResponse,
  IForgotPasswordBody,
  IResetPasswordBody,
  ISignInBody,
  ISignUpBody,
  IUser,
  IVerifyOtpBody,
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
  clearUserOtp,
  findUserByID,
} from "./auth-repositories";
import { customError } from "../../utils/customError";
import {

  generateRefreshToken,
  generateToken,
} from "../../utils/generateToken";
import { Response } from "express";
import { sendOTPEmail } from "../../email/sendEmail";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";
import { findRefreshToken } from "./auth-repositories";
import { STATUS_CODE } from "../../constants/statusCode";

export const signUpUser = async (
  body: ISignUpBody,
  res: Response,
): Promise<IAuthResponse> => {
  const { fullName, email, password } = body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new customError(ERROR_MESSAGE.USER_ALREADY_EXIST, STATUS_CODE.CONFLICT);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await createUser({
    fullName,
    email,
    password: hashPassword,
  });

  const accessToken = generateToken(
    newUser._id.toString(),
    ENV.ACCESS_TOKEN_SECRET,
    "15m",
  );

  await generateRefreshToken(newUser._id.toString(), res);
  return { accessToken, user: mapUser(newUser) };
};

export const signInUser = async (body: ISignInBody, res: Response) => {
  const { email, password } = body;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new customError(ERROR_MESSAGE.INVALID_CREDENTIALS, STATUS_CODE.UNAUTHORIZED);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new customError(ERROR_MESSAGE.INVALID_CREDENTIALS, STATUS_CODE.UNAUTHORIZED);
  }

 
  const accessToken = generateToken(user._id.toString(),ENV.ACCESS_TOKEN_SECRET,"35m")
  await generateRefreshToken(user._id.toString(), res);

  return { accessToken, user: mapUser(user) };
};

export const fetchAllUser = async (userId: string): Promise<IUser[]> => {
  const allUsers = await findAllUser(userId);

  if (!allUsers || allUsers.length === 0) {
    throw new customError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
  }

  return allUsers.map((user) => mapUser(user));
};

export const forgotPasswordService = async (
  data: IForgotPasswordBody,
): Promise<void> => {
  const { email } = data;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new customError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
  }

  const otp = await saveUserOTP(email);
  await sendOTPEmail(email, otp);
};

export const verifyOtpService = async (data: IVerifyOtpBody) => {
  const { otp } = data;

  const user = await findUserByOTP(otp);

  if (!user) {
    throw new customError(ERROR_MESSAGE.INVALID_OR_EXPIRED_OTP, STATUS_CODE.NOT_FOUND);
  }

  
  const resetToken = generateToken(user._id.toString(),ENV.OTP_TOKEN_SECRET,"15m")

  await clearUserOtp(user._id.toString());

  return { resetToken };
};

export const resetPasswordService = async (
  data: IResetPasswordBody,
): Promise<void> => {
  const { password, confirmPassword, resetToken } = data;

  if (password !== confirmPassword) {
    throw new customError("Confirm password Not Match", STATUS_CODE.BAD_REQUEST);
  }

  let decode: { userId: string };
  try {
    decode = jwt.verify(resetToken, ENV.OTP_TOKEN_SECRET) as { userId: string };
  } catch (err) {
    throw new customError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }

  const user = await findUserByID(decode.userId);
  if (!user) {
    throw new customError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  await resetUserPassword(user._id.toString(), hashPassword);
};

export const refreshTokenService = async (
  token: string,
): Promise<{ accessToken: string }> => {
  if (!token) {
    throw new customError(ERROR_MESSAGE.NO_TOKEN_FOUND, STATUS_CODE.UNAUTHORIZED);
  }

  let decode : {userId:string};

  try {
    decode = jwt.verify(token,ENV.REFRESH_TOKEN_SECRET) as {userId:string}
  } catch  {
    throw new customError(ERROR_MESSAGE.NO_TOKEN_FOUND,STATUS_CODE.UNAUTHORIZED)
  }

  const storedToken = await findRefreshToken(token);
  if (!storedToken) throw new customError("Invalid Refresh Token", STATUS_CODE.UNAUTHORIZED);

 
  const accessToken = generateToken(decode.userId,ENV.ACCESS_TOKEN_SECRET,"15m")
  return { accessToken };
};

export const logoutService = async (
  userId: string,
  res: Response,
): Promise<void> => {
  await deleteRefreshToken(userId);

  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
};
