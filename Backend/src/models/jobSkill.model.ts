import mongoose, { Document, Schema, Types } from "mongoose";


export interface IJobSkill extends Document {
  jobId: Types.ObjectId;
  skillId: Types.ObjectId;
}

const JobSkillSchema = new Schema<IJobSkill>({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: [true, "jobId is required"],
  },
  skillId: {
    type: Schema.Types.ObjectId,
    ref: "Skill",
    required: [true, "skillId is required"],
  },
});


JobSkillSchema.index({ jobId: 1, skillId: 1 }, { unique: true });

export default mongoose.model<IJobSkill>("JobSkill", JobSkillSchema);