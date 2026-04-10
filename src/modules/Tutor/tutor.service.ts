import { prisma } from "../../lib/prisma"


const createTutorIntoDB = async (payload : any, userId : string) =>{
    const user = await prisma.user.findUnique({
        where :{
            id : userId,
        },
    });
    if(!user){
        throw new Error("Invalid user");
    }
    const result = await prisma.tutorProfile.create({
        data : {...payload,userId},
    });
    return result;
};

const getAllTutorIntoDB = async ( userId:string) => {
   
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found!");
    }

   
    const result = await prisma.tutorProfile.findMany({
        where: { userId: user.id },
        include: {
            user: true,           
            availabilities: true,
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
            user: true,           
            availabilities: true,
        },
    });

    if (!result) {
        throw new Error("This user's tutor profile could not be found.");
    }

    return result;
};
const updateTutorProfile = async (userId: string, payload: any) => {

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user){  
    throw new Error("User not found!")

   }
  const tutorProfile = await prisma.tutorProfile.findUnique({ where: { userId: user.id } });
  if (!tutorProfile){ 
    throw new Error("No tutor profile, create one first.")
   };

 
  const validFields = ["bio", "experience", "hourlyRate", "subjects"];
  const dataToUpdate = Object.fromEntries(
    Object.entries(payload).filter(([key]) => validFields.includes(key))
  );


  const updatedTutor = await prisma.tutorProfile.update({
    where: { userId: user.id },
    data: dataToUpdate,
    include: {
      user: true,
      availabilities: true,
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


