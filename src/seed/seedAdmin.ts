import { prisma } from "../lib/prisma";
import { userRole } from "../middlewares/auth";
import bcrypt from "bcryptjs";

const seedAdmin = async () =>{

    const hashedPassword = await bcrypt.hash("12345", 8);

    const adminData = {
        name :"Admin",
        email : "admin@gmail.com",
        role : userRole.admin,
        password : hashedPassword,
    };

    try {
        const isExists = await prisma.user.findUnique({
        where : {
            email : adminData.email
        }
    })

    if(isExists){
        console.log("admin is already exists!!!");
        return;
    }

    const admin = await prisma.user.create({
        data : adminData,

    });
    console.log("admin created successfully!!");
    } catch (error) {
        console.log(error);
    } finally{
        await prisma.$disconnect()
    };
};
seedAdmin();