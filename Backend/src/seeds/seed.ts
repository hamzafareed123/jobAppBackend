import mongoose from "mongoose"
import Skill from "../models/skill.model"
import Assessment from "../models/assessment.model"
import { dbConnect } from "../config/db"

const skills = [
  { name: "Wireframing" },
  { name: "Problem Solving" },
  { name: "Branding" },
  { name: "Prototyping" },
  { name: "Storyboarding" },
  { name: "UI Design" },
  { name: "UX Research" },
  { name: "Figma" },
]

const assessments = [
  { name: "Technical Test" },
  { name: "Personality Assessment" },
  { name: "Coding Challenge" },
  { name: "Design Challenge" },
]

const seed = async () => {
  await dbConnect()

  // clear existing
  await Skill.deleteMany({})
  await Assessment.deleteMany({})

  // insert fresh
  await Skill.insertMany(skills)
  await Assessment.insertMany(assessments)

  console.log("✅ Skills and Assessments seeded successfully")
  mongoose.connection.close()
}

seed()