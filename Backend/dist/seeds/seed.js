"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skill_model_1 = __importDefault(require("../models/skill.model"));
const assessment_model_1 = __importDefault(require("../models/assessment.model"));
const db_1 = require("../config/db");
const jobType_model_1 = __importDefault(require("../models/jobType-model"));
const skills = [
    { name: "Wireframing" },
    { name: "Problem Solving" },
    { name: "Branding" },
    { name: "Prototyping" },
    { name: "Storyboarding" },
    { name: "UI Design" },
    { name: "UX Research" },
    { name: "Figma" },
];
const assessments = [
    { name: "Technical Test" },
    { name: "Personality Assessment" },
    { name: "Coding Challenge" },
    { name: "Design Challenge" },
];
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
];
const seed = async () => {
    await (0, db_1.dbConnect)();
    await skill_model_1.default.deleteMany({});
    await assessment_model_1.default.deleteMany({});
    await jobType_model_1.default.deleteMany({});
    await skill_model_1.default.insertMany(skills);
    await assessment_model_1.default.insertMany(assessments);
    await jobType_model_1.default.insertMany(jobTypes);
    console.log("Data added successfully");
    mongoose_1.default.connection.close();
};
seed();
//# sourceMappingURL=seed.js.map