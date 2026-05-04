import { Request, Response, NextFunction } from "express";
import { DashboardServices } from "./dashboard-services";
import { OutputHandler } from "../../middleware/outputHandler";
import { STATUS_CODE } from "../../constants/statusCode";

export const getDashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req.user as any).id;


    const dashboardStats = await DashboardServices.getDashboardData(userId);

    (res as any).result = {
      data: dashboardStats,
      message: "Dashboard Stats fetched successfully",
    };

    OutputHandler(STATUS_CODE.OK, req, res, next);
  } catch (error) {
    const status =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : STATUS_CODE.INTERNAL_SERVER_ERROR;

    OutputHandler(status, req, res, next);
  }
};
