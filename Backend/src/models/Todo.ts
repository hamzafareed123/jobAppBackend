import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface ITodoDocument extends Document {
  userId: Types.ObjectId;
  todoName: string;
  description?: string;
  status: "pending" | "completed" | "canceled";
  sharedWith?: Array<{
    userId: Types.ObjectId;
    email: string;
    sharedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodoDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    todoName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },

    sharedWith: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },

        email: {
          type: String,
        },

        sharedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

export const Todo = model<ITodoDocument>("Todo", todoSchema);
