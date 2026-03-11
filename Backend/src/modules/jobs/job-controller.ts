import { Request, Response, NextFunction } from "express";
import { jobServices } from "./job-services";
import { OutputHandler } from "../../middleware/outputHandler";
import { STATUS_CODE } from "../../constants/statusCode";
import {
  ICreateJobDTO,
  IPublishJobDTO,
  IQueryParams,
  ISaveAssessmentDTO,
  ISaveInterviewersDTO,
  ISaveJobInfoDTO,
  ISaveStagesDTO,
} from "../../types";
import { SUCCESS_MESSAGE } from "../../constants/successMessages";
import { generateFileUrl } from "../../utils/fileUrl";

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

    const { status, query, page, limit } = req.query as IQueryParams;

    const result = await jobServices.getAllJobs(
      userId,
      status || "",
      query || "",
      page || "1",
      limit || "10",
    );

    (res as any).result = {
      data: result.jobs,
      pagination:result.pagination,
      message: SUCCESS_MESSAGE.JOBS_FETCHED,
    };

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

    if (req.file) {
      data.descriptionFile = generateFileUrl(req.file.filename, req);
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

export const saveAssessment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const userId = (req.user as any).id;
    const data = req.body as ISaveAssessmentDTO;

    const job = await jobServices.saveAssessment(data, jobId, userId);

    (res as any).result = { data: job, message: "Assement and skills Saved" };

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

export const saveStages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const userId = (req.user as any).id;
    const data = req.body as ISaveStagesDTO;

    const job = await jobServices.saveStages(data, jobId, userId);
    (res as any).result = { data: job, message: "stages saved successfully" };

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

export const saveInterviewers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const userId = (req.user as any).id;
    const data = req.body as ISaveInterviewersDTO;

    const job = await jobServices.saveInterviewers(data, jobId, userId);
    (res as any).result = {
      data: job,
      message: "Interviewers saved successfully",
    };

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

export const publishJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const userId = (req.user as any).id;
    const data = req.body as IPublishJobDTO;

    const job = await jobServices.publishJob(data, jobId, userId);
    (res as any).result = {
      data: job,
      message: "Job Successfully Publish",
    };

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

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const userId = (req.user as any).id;

    const job = await jobServices.deleteJob(jobId, userId);
    (res as any).result = {
      data: job,
      message: "Job deleted Successfully ",
    };

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
