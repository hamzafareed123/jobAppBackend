import mongoose, { Document, model, Schema } from "mongoose";

export interface IRefreshTokenDocument extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const RefreshToken = model<IRefreshTokenDocument>(
  "RefreshToken",
  refreshTokenSchema,
);
