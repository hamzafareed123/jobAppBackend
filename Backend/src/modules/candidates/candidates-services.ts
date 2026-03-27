import { Types } from "mongoose";
import { customError } from "../../utils/customError";
import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import { candidateRepository } from "./candidates-repositories";
import { IMovingStageDTO, IQualifyDTO } from "../../types/candidates.types";

export const candidateServices = {
  async applyJob(jobId: string, userId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const application = await candidateRepository.applyJob(jobId, userId);

    return application;
  },
  async getCandidates(jobId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const candidates = await candidateRepository.getCandidates(jobId);

    if (!candidates) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return candidates;
  },

  async moveStage(jobId: string, candidateId: string, data: IMovingStageDTO) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    if (!Types.ObjectId.isValid(candidateId)) {
      throw new customError(
        ERROR_MESSAGE.CANDIDATE_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const candidate = await candidateRepository.moveStage(
      jobId,
      candidateId,
      data,
    );    

    return candidate;
  },

   async qualifyCandidate(jobId: string, candidateId: string, data: IQualifyDTO) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    if (!Types.ObjectId.isValid(candidateId)) {
      throw new customError(
        ERROR_MESSAGE.CANDIDATE_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const candidate = await candidateRepository.qualifyCandidate(
      jobId,
      candidateId,
      data,
    );    

    return candidate;
  },
};
