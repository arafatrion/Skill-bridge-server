import { Booking, BookingStatus, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { userRole } from "../../middlewares/auth";


const createBooking = async (payload: any): Promise<Booking> => {
  const { studentId, tutorId, categoryId, date, time } = payload;

  if (!studentId) {
    throw new Error('Student ID is required from Token!');
  }

  const result = await prisma.booking.create({
    data: {
      date: new Date(date), 
      time,
      student: { connect: { id: studentId } },
      tutor: { connect: { id: tutorId } },
      ...(categoryId && {
        category: { connect: { id: categoryId } }
      })
    },
   include: { 
      tutor: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true
        }
      }, 
      student: {
        select: {
          id: true,
          name: true,
          email: true
        }
      } 
    }
  });
  return result;
};


const getMyBookings = async (userId: string, role: string) => {
  let whereCondition: any = {};

  
  if (role === 'STUDENT') {
    whereCondition = { studentId: userId };
  } else if (role === 'TUTOR') {
    whereCondition = { tutorId: userId };
  } else {
    throw new Error('Invalid role or access denied');
  }

  return await prisma.booking.findMany({
    where: whereCondition,
    include: {
      student: true,
      tutor: { include: { tutorProfile: true } },
      category: true,
    },
  });
};

const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      tutor: {
        select: {
          id: true,
          name: true,
          email: true,
          tutorProfile: true 
        }
      },
     
      student: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
   
      category: true 
    },
  });
};


const updateBookingStatus = async (
  id: string,
  status: BookingStatus
): Promise<Booking> => {
  const isExist = await prisma.booking.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new Error('Booking not found');
  }

  return await prisma.booking.update({
    where: { id },
    data: { status },
  });
};


const cancelBooking = async (id: string): Promise<Booking> => {
  return await prisma.booking.update({
    where: { id },
    data: { status: BookingStatus.CANCELLED },
  });
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
  cancelBooking,
};