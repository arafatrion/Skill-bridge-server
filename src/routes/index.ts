import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";
import { CategoryRoutes } from "../modules/Category/category.route";

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
    },
    {
        path :"/categories",
        route :  CategoryRoutes,
    },
    
];

routerManager.forEach((r) => router.use(r.path, r.route));


export default router ;