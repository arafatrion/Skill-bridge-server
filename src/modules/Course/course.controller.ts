import { Request, Response } from 'express';
import httpStatus from 'http-status'; 

import sendResponse from '../../utils/sendResponse';
import { CourseService } from './course.service';
import { JwtPayload } from 'jsonwebtoken';


const createCourse = async (req: Request, res: Response) => {
 const user = req.user as JwtPayload & { userId: string };
  const userId = user.userId;
  const result = await CourseService.createCourseIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
};

const getAllCourses = async (req: Request, res: Response) => {
  const result = await CourseService.getAllCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    data: result,
  });
};


const getMyCourses = async (req: Request, res: Response) => {
  const user = req.user as JwtPayload & { userId: string };
  const userId = user.userId;
  const result = await CourseService.getMyCoursesFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My courses retrieved successfully',
    data: result,
  });
};


const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload & { userId: string };
  const userId = user.userId;
  const result = await CourseService.updateCourseInDB(id as string, userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
};


const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload & { userId: string };
  const userId = user.userId;
  const result = await CourseService.deleteCourseFromDB(id as string, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
};

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getMyCourses,
  updateCourse,
  deleteCourse,
};