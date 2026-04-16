import { Request, Response, NextFunction } from "express";
import {
  ICreatePositionDTO,
  IPositionQueryParams,
  IUpdatePositionDTO,
  IUpdateStatusDTO,
} from "../../types/positions.types";
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
    const createdBy = (req.user as any).id;
    const data = req.body as ICreatePositionDTO;

    const position = await positionServices.createPosition(
      jobId,
      createdBy,
      data,
    );
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

export const getPositions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobId = req.params.jobId as string;
    const { query, page, limit, sortBy, sortOrder } =
      req.query as IPositionQueryParams;

    const positions = await positionServices.getPositions(
      jobId,
      query || "",
      page || "1",
      limit || "8",
      sortBy || "",
      sortOrder || "asc" ,
    );
    (res as any).result = {
      data: positions,
      message: SUCCESS_MESSAGE.POSITION_FETCHED,
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

export const updatePosition = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const positionId = req.params.positionId as string;
    const data = req.body as IUpdatePositionDTO;

    const position = await positionServices.updatePosition(positionId, data);
    (res as any).result = {
      data: position,
      message: SUCCESS_MESSAGE.POSITION_UPDATED,
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

export const deletePosition = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const positionId = req.params.positionId as string;

    const position = await positionServices.deletePosition(positionId);
    (res as any).result = {
      data: position,
      message: SUCCESS_MESSAGE.POSITION_DELETED,
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

export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const positionId = req.params.positionId as string;
    const jobId = req.params.jobId as string;
    const {status} = req.body as IUpdateStatusDTO;

    const position = await positionServices.updatePositionStatus(positionId,jobId,status);
    (res as any).result = {
      data: position,
      message: SUCCESS_MESSAGE.POSITION_STATUS_UPDATED,
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
