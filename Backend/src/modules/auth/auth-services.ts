import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { IUserDocument, User } from "../../models/user-models";
import { IForgotPasswordBody, IResetPasswordBody, ISignInBody, ISignUpBody, IUser } from "../../types/user.types";
import bcrypt from "bcrypt";
import { mapUser } from "../../utils/mapUser";
import { findUserByEmail, createUser,findAllUser, saveUserOTP, resetUserPassword, findUserByOTP } from "./auth-repositories";
import { customError } from "../../utils/customError";
import { generateToken } from "../../utils/jwtToken";
import { Response } from "express";
import { sendOTPEmail } from "../../email/sendEmail";

export const signUpUser = async (
  body: ISignUpBody,
  res: Response,
): Promise<IUser> => {
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

  generateToken(newUser._id.toString(), res);
  return mapUser(newUser);
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

  generateToken(user._id.toString(), res);

  return mapUser(user);
};

export const fetchAllUser = async (userId:string):Promise<IUser[]>=>{

  const allUsers = await findAllUser(userId);

  if(!allUsers || allUsers.length===0){
    throw new customError(ERROR_MESSAGE.USER_NOT_FOUND,404)
  }


  return allUsers.map((user)=>mapUser(user));
}

export const forgotPasswordService = async (data:IForgotPasswordBody):Promise<void>=>{
  const {email} = data;

  const user = await findUserByEmail(email);

  if(!user){
    throw new customError(ERROR_MESSAGE.USER_NOT_FOUND,404); 
  }

  const otp = await saveUserOTP(email);
  await sendOTPEmail(email,otp)

}

export const resetPasswordService = async(data:IResetPasswordBody):Promise<void>=>{

  const {otp,password,confirmPassword}= data;

  if(password !== confirmPassword){
    throw new customError("Confirm password Not Match",400)
  }



  const user = await findUserByOTP(otp);

  if(!user){
    throw new customError(ERROR_MESSAGE.INVALID_OR_EXPIRED_OTP,404)
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password,salt);

  await resetUserPassword(user._id.toString(),hashPassword)
}
