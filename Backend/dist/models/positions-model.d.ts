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
declare const Position: mongoose.Model<any, {}, {}, {}, any, any, any>;
export default Position;
//# sourceMappingURL=positions-model.d.ts.map