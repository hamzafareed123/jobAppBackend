import { IUserDocument } from "../models/User";
import { IUser } from "../types/user.types";

export const mapUser = (user: IUserDocument): IUser => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  role: user.role,
   createdAt:user.createdAt,
    updatedAt:user.updatedAt,
});
