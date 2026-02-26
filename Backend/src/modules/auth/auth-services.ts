import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { IUserDocument, User } from "../../models/user-models";
import { ISignInBody, ISignUpBody, IUser } from "../../types/user.types";
import bcrypt from "bcrypt";
import { mapUser } from "../../utils/mapUser";
import { findUserByEmail, createUser,findAllUser } from "./auth-repositories";
import { customError } from "../../utils/customError";
import { generateToken } from "../../utils/jwtToken";
import { Response } from "express";

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
