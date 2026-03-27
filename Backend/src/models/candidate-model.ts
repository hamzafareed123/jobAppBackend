import mongoose, { Schema, Types ,Document} from "mongoose"


export  type Stage = "Applied" | "Shortlisted" | "Offered" | "Hired" | "Not Moving Forward"
export type QualifyStatus= "qualified" | "disqualified" 

export interface ICandidate extends Document {
    jobId:Types.ObjectId;
    userId:Types.ObjectId;
    stage:Stage;
    status:QualifyStatus;
    appliedAt:Date;
    createdAt:Date;
    updatedAt:Date;
}

const CandidateSchema = new Schema<ICandidate>({

    jobId:{
        type:Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    stage:{
        type:String,
        enum:["Applied","Shortlisted","Offered","Hired","Not Moving Forward"],
        default:"Applied"
    },
    status:{
        type:String,
        enum:["qualified","disqualified"],
        default:"qualified"
    },

    appliedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

CandidateSchema.index({jobId:1,userId:1},{unique:true})


const Candidate = mongoose.model<ICandidate>("Position",CandidateSchema)
export default Candidate