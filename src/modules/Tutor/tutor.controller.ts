import { Request, Response } from "express";
import { TutorService } from "./tutor.service";
import sendResponse from "../../utils/sendResponse";



const createTutor = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: User not logged in",
        data: null,
      });
    }

    const result = await TutorService.createTutorIntoDB(req.body, userId);

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Tutor Created",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};
const getAllTutor = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: User not logged in",
        data: null,
      });
    }
 
    const result = await TutorService.getAllTutorIntoDB(userId);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutors fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};
 const getSingleTutor = async (req: Request, res: Response) => {
  try {
  
    const tutorId = req.params.id as string;

    if (!tutorId) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Tutor ID is required",
        data: null,
      });
    }

 
    const result = await TutorService.getSingleTutorIntoDB(tutorId);


    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutor fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};
const updateTutor = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: User not logged in",
        data: null,
      });
    }
    const payload = req.body;
    const result = await TutorService.updateTutorProfile(userId, payload);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutor profile updated successfully",
      data: result,
    });

  } catch (error: any) {

    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  
  const userId = req.user?.userId; 
  const payload = req.body;
  const result = await TutorService.updateTutorProfile(userId, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully!',
    data: result,
  });
};



export const TutorController ={
  createTutor,
  getAllTutor,
  getSingleTutor,
  updateTutor,
  updateProfile
};