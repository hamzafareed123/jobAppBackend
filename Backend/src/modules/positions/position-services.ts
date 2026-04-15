import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import { ICreatePositionDTO } from "../../types/positions.types";
import { customError } from "../../utils/customError";
import { jobRepository } from "../jobs/job-repositories";
import { getPositions } from "./position-controller";
import { positionRepository } from "./position-repositories";

export const positionServices = {
  async createPosition(
    jobId: string,
    createdBy: string,
    data: ICreatePositionDTO,
  ) {
    if (!jobId) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.getJobById(jobId, createdBy);

    if (!job) {
      throw new customError(
        "Only Job creator can create position",
        STATUS_CODE.FORBIDDEN,
      );
    }

    const position = await positionRepository.createPosition(
      jobId,
      createdBy,
      data,
    );

    if (!position) {
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    return position;
  },

  async getPositions(jobId: string, createdBy: string) {
    if (!jobId && !createdBy) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.getJobById(jobId, createdBy);

    if (!job) {
      throw new customError(
        "Only Job creator can view positions",
        STATUS_CODE.FORBIDDEN,
      );
    }

    const position = await positionRepository.getPositions(jobId, createdBy);

    if (!position) {
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    return position;
  },
};
