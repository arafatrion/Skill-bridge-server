import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.servicce";

const createReview = async (req: Request, res: Response) => {
  const user = req.user as any; 

  const result = await ReviewService.createReview({
    ...req.body,
    studentId: user.id, 
  });

  sendResponse(res , {
    statusCode: 201,
        success: true,
        message: "Review submitted successfully",
        data: result,
  });
};

const getTutorReviews = 
async (req: Request, res: Response) => {
  const { tutorId } = req.params;

  const result = await ReviewService.getTutorReviews(tutorId as string );

  sendResponse(res, {
    statusCode:201,
    success: true,
    message: 'Reviews fetched successfully',
    data: result,
  });
};

const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ReviewService.deleteReview(id as string);

  sendResponse(res, {
    statusCode:201,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
};

export const ReviewController = {
  createReview,
  getTutorReviews,
  deleteReview,
};