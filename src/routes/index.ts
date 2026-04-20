import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { ReviewRouter } from "../modules/Review/review.router";
import { AvailabilityRouter } from "../modules/Availability/avaliability.route";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { CourseRoutes } from "../modules/Course/course.route";

const router = Router()
// router.use('/auth',AuthRoutes);

const routerManager = [
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: '/admin',
        route: AdminRoutes,
    },
    {
        path: "/tutor",
        route: TutorRoutes,
    },
    {
        path: "/categories",
        route: CategoryRoutes,
    },
    {
        path: "/bookings",
        route: BookingRoutes,
    },
    {
        path: "/reviews",
        route: ReviewRouter,
    },
    {
        path: "/availabilities",
        route: AvailabilityRouter,
    },
    {
        path: "/course",
        route: CourseRoutes,
    }


];

routerManager.forEach((r) => router.use(r.path, r.route));


export default router;