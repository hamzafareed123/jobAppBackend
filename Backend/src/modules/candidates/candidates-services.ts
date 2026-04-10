import { Types } from "mongoose";
import { customError } from "../../utils/customError";
import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import { candidateRepository } from "./candidates-repositories";
import { IMovingStageDTO, IQualifyDTO } from "../../types/candidates.types";
import { sendCandidateEmail } from "../../email/sendCandidateEmail";
import { findUserByID } from "../auth/auth-repositories";
import { jobRepository } from "../jobs/job-repositories";

export const candidateServices = {
  async applyJob(jobId: string, userId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const application = await candidateRepository.applyJob(jobId, userId);

    return application;
  },
  async getCandidates(
    jobId: string,
    stage: string,
    status: string,
    search: string,
  ) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const candidates = await candidateRepository.getCandidates(
      jobId,
      stage,
      status,
      search,
    );

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

    const candidateInfo = await findUserByID(candidateId);
    if (!candidateInfo) {
      throw new customError(
        ERROR_MESSAGE.CANDIDATE_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const job = await jobRepository.getJobOnlyById(jobId.toString());

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const candidate = await candidateRepository.moveStage(
      jobId,
      candidateId,
      data,
    );

    if (candidate && data?.email?.subject && data?.email?.body) {
      const user = candidate.userId as any;
      await sendCandidateEmail(
        user.email,
        user.fullName,
        data.email.subject,
        data.email.body,
      );
    }

    return candidate;
  },

  async qualifyCandidate(
    jobId: string,
    candidateId: string,
    data: IQualifyDTO,
  ) {
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
