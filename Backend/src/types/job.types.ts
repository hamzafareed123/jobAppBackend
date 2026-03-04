import { Types } from "mongoose";

export interface IPay {
  min?: number;
  max?: number;
  currency?: string;
  payPer?: "Hour" | "Month" | "Year";
  noSalary: boolean;
}

export interface IJob {
  _id?: Types.ObjectId;
  createdBy: Types.ObjectId;
  status: "draft" | "active" | "closed" | "archived";

  jobTitle: string;
  jobType: string;

  function?: string;
  role?: string;
  postCategory?: string;
  level?: string;
  employmentType?: string;
  noOfPositions?: number;
  startDate?: Date;
  endDate?: Date;
  remote?: "Yes" | "No" | "Hybrid";
  department?: string;
  keywords?: string[];
  pay?: IPay;
  location?: string;
  jobSummary?: string;
  descriptionText?: string;
  descriptionFile?: string;

 
  assessmentId?: Types.ObjectId;
  skillIds?: Types.ObjectId[];


  jobRequirements?: string;
  jobDescription?: string;
  elevatorPitch?: string;
  aboutUs?: boolean;
  companyBenefits?: boolean;
  additionalNotes?: string;

  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}



export interface ICreateJobDTO {
  jobTitle: string;
  jobType: string;
}

export interface ISaveJobInfoDTO {
  function?: string;
  role?: string;
  postCategory?: string;
  level?: string;
  employmentType?: string;
  noOfPositions?: number;
  startDate?: Date;
  endDate?: Date;
  remote?: "Yes" | "No" | "Hybrid";
  department?: string;
  keywords?: string[];
  pay?: IPay;
  location?: string;
  jobSummary?: string;
  descriptionText?: string;
  descriptionFile?: string | null;
}

export interface ISaveAssessmentDTO {
  assessmentId: string;
  skillIds: string[];
}

export interface ISaveStagesDTO {
  stages: {
    name: string;
    description?: string;
  }[];
}

export interface ISaveInterviewersDTO {
  interviewers: {
    userId: string;
    role: "Recruiter" | "Hiring Manager";
  }[];
}

export interface IPublishJobDTO {
  jobRequirements: string;
  jobDescription: string;
  elevatorPitch: string;
  aboutUs?: boolean;
  companyBenefits?: boolean;
  additionalNotes?: string;
}
