import mongoose, { Document, Schema, Types } from "mongoose";


export interface IJobInterviewer extends Document {
  jobId: Types.ObjectId;
  userId: Types.ObjectId;
  role: "Recruiter" | "Hiring Manager";
}


const JobInterviewerSchema = new Schema<IJobInterviewer>({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: [true, "jobId is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  role: {
    type: String,
    enum: ["Recruiter", "Hiring Manager"],
    required: [true, "Role is required"],
  },
});


JobInterviewerSchema.index({ jobId: 1, userId: 1 }, { unique: true });

export default mongoose.model<IJobInterviewer>(
  "JobInterviewer",
  JobInterviewerSchema
);