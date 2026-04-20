


import express from 'express';
import auth, { userRole } from '../../middlewares/auth';
import { CourseControllers } from './course.controller';

const router = express.Router();


router.get('/', CourseControllers.getAllCourses);


router.post(
  '/create-course',
  auth(userRole.tutor), 
  CourseControllers.createCourse
);

router.get(
  '/my-courses',
  auth(userRole.tutor),
  CourseControllers.getMyCourses
);

router.patch(
  '/:id',
  auth(userRole.tutor),
  CourseControllers.updateCourse
);

router.delete(
  '/:id',
  auth(userRole.tutor),
  CourseControllers.deleteCourse
);

export const CourseRoutes = router;