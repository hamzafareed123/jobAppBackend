import { Types } from "mongoose";
import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import {
  ICreateJobDTO,
  IPublishJobDTO,
  ISaveAssessmentDTO,
  ISaveInterviewersDTO,
  ISaveJobInfoDTO,
  ISaveStagesDTO,
} from "../../types";
import { customError } from "../../utils/customError";
import { jobRepository } from "./job-repositories";
import { User } from "../../models/user-models";

export const jobServices = {
  async createJob(data: ICreateJobDTO, userId: string) {
    if (!data.jobTitle || data.jobTitle.trim() === "") {
      throw new customError("Job title is required", STATUS_CODE.BAD_REQUEST);
    }

    if (!data.jobType || data.jobType.trim() === "") {
      throw new customError("Job type is required", STATUS_CODE.BAD_REQUEST);
    }

    if(!Types.ObjectId.isValid(data.jobType)){
      throw new customError("Invalid JOb Type",STATUS_CODE.BAD_REQUEST)
    }

    const job = await jobRepository.createJob(data, userId);
    return job;
  },

  async getAllJobs(userId: string,status:string,query:string,page:string,limit:string) {
    return  await jobRepository.getAllJobs(userId,status,query,page,limit);

  },

  async getJobById(jobId: string, userId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.getJobById(jobId, userId);
    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return job;
  },

  async saveJobInfo(data: ISaveJobInfoDTO, jobId: string, userId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.saveJobInfo(data, jobId, userId);

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return job;
  },

  async saveAssessment(
    data: ISaveAssessmentDTO,
    jobId: string,
    userId: string,
  ) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const invalidSkill = data.skillIds.find(
      (id) => !Types.ObjectId.isValid(id),
    );

    if (invalidSkill) {
      throw new customError("Invalid skill id", STATUS_CODE.BAD_REQUEST);
    }

    const job = await jobRepository.saveAssessment(data, jobId, userId);

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return job;
  },

  async saveStages(data: ISaveStagesDTO, jobId: string, userId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.saveStages(data, jobId, userId);

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return job;
  },

  async saveInterviewers(
    data: ISaveInterviewersDTO,
    jobId: string,
    userId: string,
  ) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const userIds = data.interviewers.map((i) => i.userId);

    const existingUser = await User.find({ _id: { $in: userIds } });

    if (existingUser.length !== userIds.length) {
      throw new customError(
        ERROR_MESSAGE.USER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }
    const job = await jobRepository.saveInterviewers(data, jobId, userId);

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return job;
  },

  async publishJob(data: IPublishJobDTO, jobId: string, userId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (!data.jobDescription) {
      throw new customError("Add Job Description", STATUS_CODE.NOT_FOUND);
    }

    if (!data.jobRequirements) {
      throw new customError("Add Job Requirements", STATUS_CODE.NOT_FOUND);
    }

    if (!data.elevatorPitch) {
      throw new customError("Enter Evelator Pitch", STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.publishJob(data, jobId, userId);

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return job;
  },

   async deleteJob(jobId: string, userId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }


    const job = await jobRepository.deletJob(jobId, userId);

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return job;
  },
};
