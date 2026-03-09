import { otpEmailTemplate } from "../../email/otpEmailTemplate";
import { User } from "../../models/user-models";
import { ISignUpBody } from "../../types/user.types";
import crypto from "crypto";

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

export const saveUserOTP = async (email: string) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

  await User.findOneAndUpdate({ email }, { otp, otpExpire });

  return otp;
};

export const findUserByOTP = async (otp: string) => {
  return await User.findOne({
    otp,
    otpExpire: { $gt: Date.now() },
  });
};

export const resetUserPassword = async (
  userId: string,
  hashPassword: string,
) => {
  return await User.findByIdAndUpdate(userId, {
    password: hashPassword,
    otp: null,
    otpExpire: null,
  });
};
