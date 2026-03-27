import { Request, Response, NextFunction } from "express";
import { OutputHandler } from "../../middleware/outputHandler";
import { STATUS_CODE } from "../../constants/statusCode";
import { candidateServices } from "./candidates-services";
import Candidate from "../../models/candidate-model";
import { IMovingStageDTO, IQualifyDTO } from "../../types/candidates.types";

export const applyJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const userId = (req as any).user.id;

    const application = await candidateServices.applyJob(jobId, userId);
    (res as any).result = {
      data: application,
      message: "Applied for Job Successfully",
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
export const getCandidates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;

    const application = await candidateServices.getCandidates(jobId);

    (res as any).result = {
      data: application,
      message: "Fetched Candidates successfully",
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

export const moveStage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const candidateId = req.params.candidateId as string;

    const body: IMovingStageDTO = req.body;

    const candidate = await candidateServices.moveStage(
      jobId,
      candidateId,
      body,
    );

    (res as any).result = {
      data: candidate,
      message: "Stages Update successfully",
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

export const qualifyCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const candidateId = req.params.candidateId as string;

    const body: IQualifyDTO = req.body;

    const candidate = await candidateServices.qualifyCandidate(
      jobId,
      candidateId,
      body,
    );

    (res as any).result = {
      data: candidate,
      message: "Status Update successfully",
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
