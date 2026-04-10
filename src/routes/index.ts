import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";

const router = Router()
// router.use('/auth',AuthRoutes);

const routerManager =[
    {
        path : "/auth",
        route :AuthRoutes,
    },
    {
        path :"/tutor",
        route :  TutorRoutes,
    }
];

routerManager.forEach((r) => router.use(r.path, r.route));


export default router ;