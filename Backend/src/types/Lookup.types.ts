import { Types } from "mongoose";

export interface ISkill {
  _id?: Types.ObjectId;
  name: string;
}

export interface IAssessment {
  _id?: Types.ObjectId;
  name: string;
  createdAt?: Date;
}
