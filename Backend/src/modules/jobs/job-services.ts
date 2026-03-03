import { Types } from "mongoose";
import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import { ICreateJobDTO, ISaveJobInfoDTO } from "../../types";
import { customError } from "../../utils/customError";
import { jobRepository } from "./job-repositories";

export const jobServices = {
  async createJob(data: ICreateJobDTO, userId: string) {
    if (!data.jobTitle || data.jobTitle.trim() === "") {
      throw new customError("Job title is required", STATUS_CODE.BAD_REQUEST);
    }

    if (!data.jobType || data.jobType.trim() === "") {
      throw new customError("Job type is required", STATUS_CODE.BAD_REQUEST);
    }

    const job = await jobRepository.createJob(data, userId);
    return job;
  },

  async getAllJobs(userId: string) {
    const jobs = await jobRepository.getAllJobs(userId);

    if (jobs.length === 0) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return jobs;
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
};
