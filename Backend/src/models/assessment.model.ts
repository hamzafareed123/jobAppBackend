import mongoose, { Document, Schema } from "mongoose";


export interface IAssessment extends Document {
  name: string;
  createdAt: Date;
}


const AssessmentSchema = new Schema<IAssessment>(
  {
    name: {
      type: String,
      required: [true, "Assessment name is required"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAssessment>("Assessment", AssessmentSchema);