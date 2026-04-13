import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const secret = process.env.JWT_SECRET as string;

const createUserIntoDB = async(payload : any)=>{
   const hashPassword = await bcrypt.hash(payload.password, 12);
   


 
 const result = await prisma.user.create({
    data : { ...payload, password:hashPassword},

 });
 const {password, ...newResult} = result;
 return newResult;


};

const loginUserIntoDB = async(payload : any)=>{
   
const user = await prisma.user.findUnique({
   where : {
      email :payload.email
   }
})
if(!user){
   throw new Error("User not found")
}

const isPasswordMatched = await bcrypt.compare( payload.password,user.password);
if(!isPasswordMatched){
   throw new Error("Invalid credentials")
}


const userData = {
   id : user.id,
   name : user.name,
   role : user.role,
   email : user.email,
}
const token = jwt.sign(userData, secret, {expiresIn : "7d"});

return {
   token ,
   user,
};

};



export const AuthService = {
    // Add service methods here
    createUserIntoDB,
    loginUserIntoDB
    };