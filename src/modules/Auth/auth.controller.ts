import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";



const createUser = async (req: Request, res:Response ) =>{
  
    try {
       const result = await AuthService.createUserIntoDB(req.body)
       sendResponse(res,{
        statusCode:201,
        success : true,
        message : "User Created",
        data : result,
       })
    } catch (error) {
       sendResponse(res,{
        statusCode:201,
        success : true,
        message : "Something Went Wrong!!!",
        data :error,
       })
    }
};
const loginUser = async (req: Request, res:Response ) =>{
  
    try {
       const result = await AuthService.loginUserIntoDB(req.body)
        
       res.cookie("token",result.token,{
        secure :false,
        httpOnly : true,
        sameSite :"strict"
       })
       
       sendResponse(res,{
        statusCode:201,
        success : true,
        message : "User Logged in successfully",
        data : result,
       })
    } catch (error) {
       sendResponse(res,{
        statusCode:200,
        success : false,
        message : "Something Went Wrong!!!",
        data :error,
       })
    }
};


export const AuthController = {
    // Add controller methods here
    createUser,
    loginUser
    };