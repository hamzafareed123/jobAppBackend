import mongoose from "mongoose";
import { ENV } from "./env";


export const dbConnect=async()=>{
    try {
        await mongoose.connect(ENV.MONGO_URL!)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Error in connecting Database")        
    }
}