import { Request, Response, NextFunction } from "express";
import { eventServices } from "./events-services";
import { ICreateEventDTO } from "../../types/events.types";
import { OutputHandler } from "../../middleware/outputHandler";
import { STATUS_CODE } from "../../constants/statusCode";
import { SUCCESS_MESSAGE } from "../../constants/successMessages";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const  jobId  = req.params.jobId as string ;
    const userId = (req as any).user.id;
    const data = req.body as ICreateEventDTO;

    const event = await eventServices.createEvent(jobId, userId, data);

    (res as any).result = {
      data: event,
      message: SUCCESS_MESSAGE.EVENT_CREATED,
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
