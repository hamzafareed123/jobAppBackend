import { Types } from "mongoose";
import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import { Job } from "../../models";
import Candidate from "../../models/candidate-model";
import { customError } from "../../utils/customError";
import { IMovingStageDTO, IQualifyDTO } from "../../types/candidates.types";

export const candidateRepository = {
  async applyJob(jobId: string, userId: string) {
    const job = await Job.findById(jobId);

    // check if job exit
    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // check status is active or draft

    if (job.status === "draft") {
      throw new customError(
        ERROR_MESSAGE.JOB_NOT_ACTIVE,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    // check job creator is applying his own job
    if (job.createdBy.toString() === userId) {
      throw new customError(
        "You can't apply you own Job",
        STATUS_CODE.BAD_REQUEST,
      );
    }

    // check candidate already applied

    const existingCandidate = await Candidate.findOne({
      jobId: new Types.ObjectId(jobId),
      userId: new Types.ObjectId(userId),
    });

    if (existingCandidate) {
      throw new customError(
        "You Alreay Applied for this job",
        STATUS_CODE.CONFLICT,
      );
    }

    const application = await Candidate.create({
      jobId: new Types.ObjectId(jobId),
      userId: new Types.ObjectId(userId),
      stage: "Applied",
      status: "pending",
      appliedAt: new Date(),
    });

    return application;
  },

  async getCandidates(jobId: string) {
    const candidates = await Candidate.find({ jobId })
      .populate("userId", "fullName")
      .populate("jobId", "jobTitle");

    const grouped = {
      Applied: candidates.filter((c) => c.stage === "Applied"),
      Shortlisted: candidates.filter((c) => c.stage === "Shortlisted"),
      Offered: candidates.filter((c) => c.stage === "Offered"),
      Hired: candidates.filter((c) => c.stage === "Hired"),
      "Not Moving Forward": candidates.filter(
        (c) => c.stage === "Not Moving Forward",
      ),
    };

    return grouped;
  },

  async moveStage(jobId: string, candidateId: string, data: IMovingStageDTO) {
    return await Candidate.findOneAndUpdate(
      { _id: candidateId, jobId },
      { $set: { stage: data.stage } },
      { new: true },
    );
  },

  async qualifyCandidate(
    jobId: string,
    candidateId: string,
    data: IQualifyDTO,
  ) {
    return await Candidate.findOneAndUpdate(
      { _id: candidateId, jobId },
      { $set: { status: data.status } },
      { new: true },
    );
  },
};
