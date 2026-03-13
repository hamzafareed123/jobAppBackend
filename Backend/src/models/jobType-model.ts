import mongoose, { Document, Schema } from "mongoose";

export interface IJobType extends Document{
    name:string
}

const JobTypeSchema = new Schema<IJobType>({

    name:{
        type:String,
        required:true,
        trim:true
    }
})

 const JobType= mongoose.model<IJobType>("JobType",JobTypeSchema)
 export default JobType