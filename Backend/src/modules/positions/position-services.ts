import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import {
  ICreatePositionDTO,
  IUpdatePositionDTO,
} from "../../types/positions.types";
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

  async getPositions(
    jobId: string,
    query: string,
    page: string,
    limit: string,
    sortBy: string,
    sortOrder: string,
  ) {
    if (!jobId) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const position = await positionRepository.getPositions(
      jobId,
      query,
      page,
      limit,
      sortBy,
      sortOrder,
    );

    if (!position) {
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    return position;
  },

  async updatePosition(positionId: string, data: IUpdatePositionDTO) {
    if (!positionId) {
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const position = await positionRepository.updatePosition(positionId, data);

    if (!position) {
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    return position;
  },

  async deletePosition(positionId: string) {
    if (!positionId) {
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const position = await positionRepository.deletePosition(positionId);

    if (!position) {
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    return position;
  },

  async updatePositionStatus(positionId:string,jobId:string,status:string){
    if(!positionId){
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

      const job = await jobRepository.getJobOnlyById(jobId)
      if(!job){
        throw new customError(
          ERROR_MESSAGE.JOB_NOT_FOUND,
          STATUS_CODE.NOT_FOUND
        )
    }

    const position = await positionRepository.updatePositionStatus(positionId,jobId,status);
    if(!position){
      throw new customError(
        ERROR_MESSAGE.POSITION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      )
    }

    return position;
  }
};
