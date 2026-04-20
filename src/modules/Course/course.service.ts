import { prisma } from "../../lib/prisma";

const createCourseIntoDB = async (payload: any, userId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId }
  });

  if (!tutor) throw new Error("Tutor profile not found!");

  const result = await prisma.course.create({
    data: {
      ...payload,
      tutorId: tutor.id 
    }
  });
  return result;
};
const getAllCoursesFromDB = async () => {
  return await prisma.course.findMany({
    include: {
      tutor: {
        include: { user: true } 
      }
    }
  });
};

const getMyCoursesFromDB = async (userId: string) => {
  return await prisma.course.findMany({
    where: {
      tutor: {
        userId: userId
      }
    }
  });
};

const updateCourseInDB = async (courseId: string, userId: string, payload: Partial<any>) => {

  const isOwner = await prisma.course.findFirst({
    where: {
      id: courseId,
      tutor: { userId }
    }
  });

  if (!isOwner) throw new Error("You are not authorized to update this course!");

  const result = await prisma.course.update({
    where: { id: courseId },
    data: payload
  });
  return result;
};

const deleteCourseFromDB = async (courseId: string, userId: string) => {
  const isOwner = await prisma.course.findFirst({
    where: {
      id: courseId,
      tutor: { userId }
    }
  });

  if (!isOwner) throw new Error("You are not authorized to delete this course!");

  await prisma.course.delete({
    where: { id: courseId }
  });
  
  return { message: "Course deleted successfully" };
}; 

export const CourseService = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getMyCoursesFromDB,
    updateCourseInDB,
    deleteCourseFromDB
};