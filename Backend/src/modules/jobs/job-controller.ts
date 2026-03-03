import { Request, Response, NextFunction } from "express";
import { jobServices } from "./job-services";
import { OutputHandler } from "../../middleware/outputHandler";
import { STATUS_CODE } from "../../constants/statusCode";
import { ICreateJobDTO, ISaveJobInfoDTO } from "../../types";
import { SUCCESS_MESSAGE } from "../../constants/successMessages";

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body as ICreateJobDTO;
    const userId = (req.user as any).id;

    const job = await jobServices.createJob(data, userId);

    (res as any).result = { data: job, message: "Job Created Successfully" };
    OutputHandler(STATUS_CODE.CREATED, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;

    OutputHandler(status, req, res, next);
  }
};

export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req.user as any).id;

    const jobs = await jobServices.getAllJobs(userId);
    (res as any).result = { data: jobs, message: SUCCESS_MESSAGE.JOBS_FETCHED };

    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;

    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;

    OutputHandler(status, req, res, next);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;

    const userId = (req.user as any).id;

    const job = await jobServices.getJobById(jobId, userId);
    (res as any).result = { data: job, message: SUCCESS_MESSAGE.JOB_FETCHED };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;

    OutputHandler(status, req, res, next);
  }
};

export const saveJobInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const userId = (req.user as any).id;
    const data = req.body as ISaveJobInfoDTO;

    console.log("data is ", data);

    if (req.file) {
      data.descriptionFile = req.file.filename;
    }

    const job = await jobServices.saveJobInfo(data, jobId, userId);

    (res as any).result = { data: job, message: "Job Saved Successfully" };

    OutputHandler(STATUS_CODE.CREATED, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;

    OutputHandler(status, req, res, next);
  }
};
