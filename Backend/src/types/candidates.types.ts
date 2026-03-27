import { Document, Types } from "mongoose";
export type Stage =
  | "Applied"
  | "Shortlisted"
  | "Offered"
  | "Hired"
  | "Not Moving Forward";
export type QualifyStatus = "qualified" | "disqualified" ;

export interface IPosition {
  jobId: Types.ObjectId;
  userId: Types.ObjectId;
  stage: Stage;
  status: QualifyStatus;
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMovingStageDTO {
  stage: Stage;
}

export interface IQualifyDTO {
  status: QualifyStatus;
}

export interface ICandidateQueryParams {
  stage?: Stage;
  status?: QualifyStatus;
  search?: string;
}
