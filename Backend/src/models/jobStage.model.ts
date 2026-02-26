import mongoose, { Document, Schema, Types } from "mongoose";


export interface IJobStage extends Document {
  jobId: Types.ObjectId;
  name: string;
  description?: string;
  order: number;
}


const JobStageSchema = new Schema<IJobStage>({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: [true, "jobId is required"],
  },
  name: {
    type: String,
    required: [true, "Stage name is required"],
    trim: true,
  },
  description: {
    type: String,
    default: null,
  },
  order: {
    type: Number,
    required: [true, "Order is required"],
  },
});

JobStageSchema.index({ jobId: 1, order: 1 });

export default mongoose.model<IJobStage>("JobStage", JobStageSchema);