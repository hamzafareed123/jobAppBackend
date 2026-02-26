import mongoose, { Document, Schema, Types } from "mongoose";


export interface IPay {
  min?: number;
  max?: number;
  currency?: string;
  payPer?: "Hour" | "Month" | "Year";
  noSalary: boolean;
}


export interface IJob extends Document {
 
  createdBy: Types.ObjectId;
  status: "draft" | "active" | "closed" | "archived";

  jobTitle: string;
  jobType: string;

  
  function?: string;
  role?: string;
  postCategory?: string;
  level?: string;
  employmentType?: string;
  noOfPositions?: number;
  startDate?: Date;
  endDate?: Date;
  remote?: "Yes" | "No" | "Hybrid";
  department?: string;
  keywords?: string[];
  pay?: IPay;
  location?: string;
  jobSummary?: string;
  descriptionText?: string;
  descriptionFile?: string;


  assessmentId?: Types.ObjectId;


  jobRequirements?: string;
  jobDescription?: string;
  elevatorPitch?: string;
  aboutUs?: boolean;
  companyBenefits?: boolean;
  additionalNotes?: string;

  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaySchema = new Schema<IPay>(
  {
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    currency: { type: String, default: null },
    payPer: {
      type: String,
      enum: ["Hour", "Month", "Year"],
      default: null,
    },
    noSalary: { type: Boolean, default: false },
  },
  { _id: false } 
);


const JobSchema = new Schema<IJob>(
  {
    
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreatedBy is required"],
    },
    status: {
      type: String,
      enum: ["draft", "active", "closed", "archived"],
      default: "draft",
    },

    
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
    },

  
    function: { type: String, default: null },
    role: { type: String, default: null },
    postCategory: { type: String, default: null },
    level: { type: String, default: null },
    employmentType: { type: String, default: null },
    noOfPositions: { type: Number, default: null },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    remote: {
      type: String,
      enum: ["Yes", "No", "Hybrid"],
      default: null,
    },
    department: { type: String, default: null },
    keywords: { type: [String], default: [] },
    pay: { type: PaySchema, default: () => ({ noSalary: false }) },
    location: { type: String, default: null },
    jobSummary: { type: String, default: null },
    descriptionText: { type: String, default: null },
    descriptionFile: { type: String, default: null }, 

    
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      default: null,
    },

    
    jobRequirements: { type: String, default: null },
    jobDescription: { type: String, default: null },
    elevatorPitch: { type: String, default: null },
    aboutUs: { type: Boolean, default: false },
    companyBenefits: { type: Boolean, default: false },
    additionalNotes: { type: String, default: null },

  
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IJob>("Job", JobSchema);