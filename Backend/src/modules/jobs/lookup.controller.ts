import { Request, Response, NextFunction } from "express";
import Skill from "../../models/skill.model";
import Assessment from "../../models/assessment.model";
import { OutputHandler } from "../../middleware/outputHandler";
import { STATUS_CODE } from "../../constants/statusCode";
import JobType from "../../models/jobType-model";

export const getAllSkills = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });
    (res as any).result = { data: skills, message: "Skills fetched" };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    OutputHandler(STATUS_CODE.INTERNAL_SERVER_ERROR, req, res, next);
  }
};

export const getAllAssessments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assessments = await Assessment.find().sort({ name: 1 });
    (res as any).result = { data: assessments, message: "Assessments fetched" };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    OutputHandler(STATUS_CODE.INTERNAL_SERVER_ERROR, req, res, next);
  }
};

export const getJobType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobTypes = await JobType.find().sort({ name: 1 });
    
    (res as any).result = { data: jobTypes, message: "Job Types fetched" };
     OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    OutputHandler(STATUS_CODE.INTERNAL_SERVER_ERROR, req, res, next);
  }
};
