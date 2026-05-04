import mongoose, { Types, Document } from "mongoose";
export type Stage = "Applied" | "Shortlisted" | "Offered" | "Hired" | "Not Moving Forward";
export type QualifyStatus = "qualified" | "disqualified";
export interface ICandidate extends Document {
    jobId: Types.ObjectId;
    userId: Types.ObjectId;
    stage: Stage;
    status: QualifyStatus;
    appliedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const Candidate: mongoose.Model<any, {}, {}, {}, any, any, any>;
export default Candidate;
//# sourceMappingURL=candidate-model.d.ts.map