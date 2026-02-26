import { User } from "../../models/user-models";
import { ISignUpBody } from "../../types/user.types";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserByEmails = async (emails: string[]) => {
  return await User.find({ email: { $in: emails } });
};

export const createUser = async (userData: ISignUpBody) => {
  return await User.create(userData);
};

export const findUserByID = async (userId: string) => {
  return await User.findById(userId).select("-password");
};

export const findAllUser = async (userId: string) => {
  return await User.find({ _id: { $ne: userId } }).select("-password");
};
