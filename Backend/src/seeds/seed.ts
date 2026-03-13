import mongoose from "mongoose"
import Skill from "../models/skill.model"
import Assessment from "../models/assessment.model"
import { dbConnect } from "../config/db"
import JobType from "../models/jobType-model"

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

const jobTypes = [

  { name: "Software Development" },
  { name: "Data Science" },
  { name: "DevOps & Cloud" },
  { name: "Cybersecurity" },
  { name: "AI & Machine Learning" },
  { name: "QA & Testing" },


  { name: "UI/UX Design" },
  { name: "Graphic Design" },
  { name: "Product Design" },
  { name: "Motion Design" },


  { name: "Marketing" },
  { name: "Sales" },
  { name: "Business Development" },
  { name: "Product Management" },
  { name: "Project Management" },
  { name: "Operations" },
  { name: "Finance & Accounting" },
  { name: "Human Resources" },
  { name: "Customer Support" },

  { name: "Content Writing" },
  { name: "Copywriting" },
  { name: "SEO & SEM" },
  { name: "Social Media" },

  
  { name: "Legal" },
  { name: "Healthcare" },
  { name: "Education & Training" },
  { name: "Research & Development" },
]
const seed = async () => {
  await dbConnect()


  await Skill.deleteMany({})
  await Assessment.deleteMany({})
  await JobType.deleteMany({})


 
  await Skill.insertMany(skills)
  await Assessment.insertMany(assessments)
  await JobType.insertMany(jobTypes)

  console.log("Data added successfully")
  mongoose.connection.close()
}

seed()