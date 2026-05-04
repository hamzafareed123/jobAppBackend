import mongoose, { Document, Schema, Types } from "mongoose";

export type EventType = "interview" | "meeting" | "task" | "other";

export interface IEvents extends Document {
  jobId: Types.ObjectId;
  createdBy: Types.ObjectId;
  candidateId?: Types.ObjectId;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: EventType;
  isAutoScheduled?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvents>({
    jobId:{
        type:Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },

    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    candidateId:{
        type:Schema.Types.ObjectId,
        ref:"Candidate",
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
    },

    startTime:{
        type:Date,
        default:Date.now
    },

    endTime:{
        type:Date,
        default:Date.now
    },

    type:{
        type:String,
        enum:["interview" , "meeting" , "task" , "other"],
        default:"interview"

    },

    isAutoScheduled:{
        type:Boolean,
        default:true
    }
    

},{timestamps:true})


const Event = mongoose.model<IEvents>("Events",eventSchema);
export default Event;

