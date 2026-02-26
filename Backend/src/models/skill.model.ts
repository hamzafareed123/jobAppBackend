import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name: string;
}


const SkillSchema = new Schema<ISkill>({
  name: {
    type: String,
    required: [true, "Skill name is required"],
    unique: true,
    trim: true,
  },
});

export default mongoose.model<ISkill>("Skill", SkillSchema);