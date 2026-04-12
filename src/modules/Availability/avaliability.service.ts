
import { Availability } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createAvailability = async (payload: any): Promise<Availability> => {
  const { tutorId, day, startTime, endTime } = payload;

  const isExist = await prisma.availability.findFirst({
    where: {
      tutorId,
      day,
      startTime,
      endTime
    }
  });

  if (isExist) {
    throw new Error('This availability slot already exists!');
  }

  return await prisma.availability.create({
    data: {
      tutorId,
      day, //  'MONDAY', 'TUESDAY'
      startTime, //  '10:00 AM'
      endTime    // '11:00 AM'
    }
  });
};

const getTutorAvailability = async (tutorId: string) => {
  return await prisma.availability.findMany({
    where: { tutorId },
    orderBy: {
      day: 'asc'
    }
  });
};

const deleteAvailability = async (id: string) => {
  return await prisma.availability.delete({
    where: { id }
  });
};

export const AvailabilityService = {
  createAvailability,
  getTutorAvailability,
  deleteAvailability
};