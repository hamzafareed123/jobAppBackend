import jwt from "jsonwebtoken"
import { Response } from "express";
import { ENV } from "../config/env";

export const generateToken = (userId:String,res:Response):string=>{
    const token = jwt.sign({userId},ENV.JWT_SECRET,{expiresIn:'7d'})

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"lax"
    })

    return token;
}