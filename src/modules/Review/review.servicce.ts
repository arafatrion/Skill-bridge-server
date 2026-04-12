import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createReview = async (payload: any): Promise<Review> => {
  const { studentId, tutorId, rating, comment } = payload;

  const result = await prisma.$transaction(async (transactionClient) => {
    
    const newReview = await transactionClient.review.create({
      data: {
        rating,
        comment,
        student: { connect: { id: studentId } },
        tutor: { connect: { id: tutorId } },
      },
    });

   
    const allReviews = await transactionClient.review.aggregate({
      where: { tutorId },
      _avg: { rating: true },
      _count: { id: true },
    });

    const avgRating = allReviews._avg.rating || 0;
    const totalReview = allReviews._count.id || 0;

 
    await transactionClient.tutorProfile.update({
      where: { userId: tutorId },
      data: {
        avgRating,
        totalReview,
      },
    });

    return newReview;
  });

  return result;
};

const getTutorReviews = async (tutorId: string) => {
  return await prisma.review.findMany({
    where: { tutorId },
    include: {
      student: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const deleteReview = async (id: string) => {
  return await prisma.review.delete({
    where: { id },
  });
};

export const ReviewService = {
  createReview,
  getTutorReviews,
  deleteReview
};