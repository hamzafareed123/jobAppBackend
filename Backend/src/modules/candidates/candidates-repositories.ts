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

  
    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

  

    if (job.status === "draft") {
      throw new customError(
        ERROR_MESSAGE.JOB_NOT_ACTIVE,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    if (job.createdBy.toString() === userId) {
      throw new customError(
        "You can't apply you own Job",
        STATUS_CODE.BAD_REQUEST,
      );
    }

    

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
      status: "qualified",
      appliedAt: new Date(),
    });

    return application;
  },
  async getCandidates(
    jobId: string,
    stage: string,
    status: string,
    search: string,
  ) {
    const matchStage: any = { jobId: new Types.ObjectId(jobId) };

    if (stage) matchStage.stage = stage;
    if (status) matchStage.status = status;

    const pipeline: any[] = [
      { $match: matchStage },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },

      { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },

      ...(search
        ? [{ $match: { "userId.fullName": { $regex: search, $options: "i" } } }]
        : []),

      {
        $project: {
          stage: 1,
          status: 1,
          "userId._id": 1,
          "userId.fullName": 1,
          "userId.email": 1,
          appliedAt: 1,
          createdAt: 1,
        },
      },
    ];

    const filteredCandidates = await Candidate.aggregate(pipeline);

    
    const grouped = {
      Applied: filteredCandidates.filter((c) => c.stage === "Applied"),
      Shortlisted: filteredCandidates.filter((c) => c.stage === "Shortlisted"),
      Offered: filteredCandidates.filter((c) => c.stage === "Offered"),
      Hired: filteredCandidates.filter((c) => c.stage === "Hired"),
      "Not Moving Forward": filteredCandidates.filter(
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
    ).populate("userId","fullName email");
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
