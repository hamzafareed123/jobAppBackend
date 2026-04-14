import { Request, Response, NextFunction } from "express";
import { ICreatePositionDTO } from "../../types/positions.types";
import { SUCCESS_MESSAGE } from "../../constants/successMessages";
import { OutputHandler } from "../../middleware/outputHandler";
import { STATUS_CODE } from "../../constants/statusCode";
import { positionServices } from "./position-services";


export const createPosition = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const data = req.body as ICreatePositionDTO;

    const position = await positionServices.createPosition(jobId, data);
    (res as any).result = {
      data: position,
      message: SUCCESS_MESSAGE.POSITION_CREATED,
    };

    OutputHandler(STATUS_CODE.CREATED, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};
