import { prisma } from "../../lib/prisma"

const createTutorIntoDB = async (payload : any, userId : string) =>{
    const user = await prisma.user.findUnique({
        where :{ id : userId },
    });
    if(!user){
        throw new Error("Invalid user");
    }
    const result = await prisma.tutorProfile.create({
        data : {...payload, userId},
    });
    return result;
};

const getAllTutorIntoDB = async (userId: string) => {
    const result = await prisma.tutorProfile.findMany({
        where: { userId: userId },
        include: {
            user: {
                include: {
                    availabilities: true,
                }
            }
        },
    });

    if (result.length === 0) {
        throw new Error("This user's tutor profile could not be found");
    }
    return result;
};

const getSingleTutorIntoDB = async (tutorId: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: { id: tutorId },
        include: {
            user: {
                include: {
                    availabilities: true,
                }
            }
        },
    });

    if (!result) {
        throw new Error("This user's tutor profile could not be found.");
    }
    return result;
};

const updateTutorProfile = async (userId: string, payload: any) => {
    const validFields = ["bio", "experience", "hourlyRate", "subjects"];
    const dataToUpdate = Object.fromEntries(
        Object.entries(payload).filter(([key]) => validFields.includes(key))
    );

    const updatedTutor = await prisma.tutorProfile.update({
        where: { userId: userId },
        data: dataToUpdate,
        include: {
            user: {
                include: {
                    availabilities: true,
                }
            }
        },
    });

    return updatedTutor;
};

export const TutorService = {
    createTutorIntoDB,
    getAllTutorIntoDB,
    getSingleTutorIntoDB,
    updateTutorProfile
};