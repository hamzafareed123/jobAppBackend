import { Job } from "../../models";
import { ICreateJobDTO, IJob, ISaveJobInfoDTO } from "../../types";
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
    return await Job.find({ createdBy: userId });
  },

  async getJobById(jobId: string, userId: string): Promise<IJob | null> {
    return await Job.findOne({
      _id: jobId,
      createdBy: userId,
    });
  },

  async saveJobInfo(data: ISaveJobInfoDTO, jobId: string, userId: string){
    return await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      { $set: { ...data } },
      { new: true },
    );
  },
};
