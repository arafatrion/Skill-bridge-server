import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AvailabilityService } from "./avaliability.service";

const createAvailability = async (req: Request, res: Response) => {
  const user = req.user as any;

  const result = await AvailabilityService.createAvailability({
    ...req.body,
    tutorId: user.id, 
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Availability slot added successfully',
    data: result,
  });
};

const getTutorAvailability = async (req: Request, res: Response) => {
  const { tutorId } = req.params;
  const result = await AvailabilityService.getTutorAvailability(tutorId as string);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Availability fetched successfully',
    data: result,
  });
};

export const AvailabilityController = {
  createAvailability,
  getTutorAvailability,
};