import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../modules/Auth/auth.service";
import { prisma } from "../lib/prisma";



export enum userRole {
    admin = "ADMIN",
    student = "STUDENT",
    tutor = "TUTOR"
}

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                throw new Error("Token not found");
            }

            const decoded = jwt.verify(token, secret) as JwtPayload;

            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },
            });
            console.log("DB User:", userData);

            if (!userData) {
                throw new Error("Unauthorized");
            }

            if (userData.status.toLowerCase() !== "active") {
                throw new Error("Unauthorized");
            }

            if (roles.length && !roles.includes(decoded.role)) {
                throw new Error("Unauthorized");
            }

            req.user = decoded as JwtPayload;

            next();
        } catch (error: any) {
            next(error);
        }
    };
};

export default auth;
