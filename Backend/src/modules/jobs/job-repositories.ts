import { Job } from "../../models";
import {
  IAssessment,
  ICreateJobDTO,
  IJob,
  IPublishJobDTO,
  ISaveAssessmentDTO,
  ISaveInterviewersDTO,
  ISaveJobInfoDTO,
  ISaveStagesDTO,
} from "../../types";
import { Types } from "mongoose";

export const jobRepository = {
  async createJob(data: ICreateJobDTO, userId: string) {
    const job = await Job.create({
      jobTitle: data.jobTitle,
      jobType: data.jobType,
      createdBy: new Types.ObjectId(userId),
      status: "draft",
    });

    return job;
  },

  async getAllJobs(userId: string): Promise<IJob[]> {
    return await Job.find({ createdBy: userId })
      .populate("assessmentId", "name")
      .populate("skillIds", "name");
  },

  async getJobById(jobId: string, userId: string): Promise<IJob | null> {
    return await Job.findOne({
      _id: jobId,
      createdBy: userId,
    })
      .populate("assessmentId", "name")
      .populate("skillIds", "name");
  },

  async saveJobInfo(data: ISaveJobInfoDTO, jobId: string, userId: string) {
    return await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      { $set: { ...data } },
      { new: true },
    );
  },

  async saveAssessment(
    data: ISaveAssessmentDTO,
    jobId: string,
    userId: string,
  ) {
    return await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      {
        $set: {
          assessmentId: data.assessmentId,
          skillIds: data.skillIds,
        },
      },
      { new: true },
    )
      .populate("assessmentId", "name")
      .populate("skillIds", "name");
  },

  async saveStages(data: ISaveStagesDTO, jobId: string, userId: string) {
    const stagesWithOrder = data.stages.map((stage, index) => ({
      name: stage.name,
      description: stage.description || null,
      order: index + 1,
    }));

    return await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      {
        $set: {
          stages: stagesWithOrder,
        },
      },
      { new: true },
    );
  },

  async saveInterviewers(
    data: ISaveInterviewersDTO,
    jobId: string,
    userId: string,
  ) {
    return await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      {
        $set: {
          interviewers: data.interviewers,
        },
      },
      { new: true },
    );
  },

  async publishJob(data: IPublishJobDTO, jobId: string, userId: string) {
    return await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      {
        $set: {
          ...data,
          status: "active",
          publishedAt: new Date(),
        },
      },
      { new: true },
    );
  },
  async deletJob(jobId: string, userId: string) {
    return await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  },
};
