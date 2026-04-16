import { Request, Response, NextFunction } from "express";
import { Position } from "../models";
import { STATUS_CODE } from "../constants/statusCode";
import { customError } from "../utils/customError";
export const checkPositionOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const positionId = req.params.positionId;

    if (!positionId) {
      throw new customError("Position ID is required", STATUS_CODE.BAD_REQUEST);
    }

    const position = await Position.findById(positionId);

    if (!position) {
      throw new customError("Position not found", STATUS_CODE.NOT_FOUND);
    }

    if (position.createdBy.toString() !== (req.user as any).id) {
      throw new customError(
        "You do not have permission to access this position",
        STATUS_CODE.FORBIDDEN,
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
