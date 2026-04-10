import { Job } from "../../models";
import Candidate from "../../models/candidate-model";

export const DashboardRepository = {
  async getDashboardData(userId: string) {
    const now = new Date();
    const startOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
      0,
      0,
      0,
    );
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
    );

    const [candidatesLastMonth, liveJobs, stageDistribution] =
      await Promise.all([
        Candidate.countDocuments({
          appliedAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        }),

        Job.countDocuments({
          status: "active",
          createdBy: userId,
        }),

        Candidate.aggregate([
          { $group: { _id: "$stage", count: { $sum: 1 } } },
        ]),
      ]);

    const pipeline: Record<string, Number> = {};

    stageDistribution.forEach((item: any) => {
      pipeline[item._id] = item.count;
    });

    return {
      candidatesLastMonth,
      liveJobs,
      pipeline: {
        Applied: pipeline["Applied"] || 0,
        Shortlisted: pipeline["Shortlisted"] || 0,
        Offered: pipeline["Offered"] || 0,
        Hired: pipeline["Hired"] || 0,
      },
    };
  },
};
