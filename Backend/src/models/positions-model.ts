import mongoose, { Document } from "mongoose";

export interface IPosition extends Document {
  jobId: string;
  createdBy: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: "live" | "filed" | "closed";
  required: Number;
  offered: Number;
  filled: Number;
  underOffer: Number;
}

const PositionSchema = new mongoose.Schema<IPosition>(
  {
    jobId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["live", "filed", "closed"],
      required: true,
    },
    required: {
      type: Number,
      required: true,
    },
    offered: {
      type: Number,
      required: true,
    },
    filled: {
      type: Number,
      required: true,
    },
    underOffer: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Position =
  mongoose.models.Position ||
  mongoose.model<IPosition>("Position", PositionSchema);
export default Position;
