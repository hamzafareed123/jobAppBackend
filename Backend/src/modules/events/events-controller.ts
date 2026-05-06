import { Request, Response, NextFunction } from "express";
import { eventServices } from "./events-services";
import { ICreateEventDTO, IQueryEventDTO, IUpdateEventDTO } from "../../types/events.types";
import { OutputHandler } from "../../middleware/outputHandler";
import { STATUS_CODE } from "../../constants/statusCode";
import { SUCCESS_MESSAGE } from "../../constants/successMessages";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
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

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const eventId = req.params.eventId as string;
    const userId = (req as any).user.id;

    const body = req.body as IUpdateEventDTO;

    const updatedEvent = await eventServices.updateEvent(
      jobId,
      eventId,
      userId,
      body,
    );
    (res as any).result = {
      data: updatedEvent,
      message: SUCCESS_MESSAGE.EVENT_UPDATED,
    };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;
    OutputHandler(status, req, res, next);
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const userId = (req as any).user.id;

    const body = req.body as IQueryEventDTO;

    const allEvents = await eventServices.getAllEvents(
      userId,
      body,
    );
    (res as any).result = {
      data: allEvents,
      message: SUCCESS_MESSAGE.EVENT_FETCHED,
    };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;
    OutputHandler(status, req, res, next);
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const userId = (req as any).user.id;
    const eventId= req.params.eventId as string

    const event = await eventServices.getEventById(
      userId,
      eventId,
    );
    (res as any).result = {
      data: event,
      message: SUCCESS_MESSAGE.EVENT_FETCHED,
    };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;
    OutputHandler(status, req, res, next);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const userId = (req as any).user.id;
    const eventId= req.params.eventId as string;
    const jobId= req.params.jobId as string;

    const event = await eventServices.deleteEvent(
      jobId,
      eventId,
      userId,
    );
    (res as any).result = {
      data: event,
      message: SUCCESS_MESSAGE.EVENT_DELETED,
    };
    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    (res as any).error = error;
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;
    OutputHandler(status, req, res, next);
  }
};