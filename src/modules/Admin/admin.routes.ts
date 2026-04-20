import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();


router.get(
  "/stats",
  AdminController.getAdminStats
);


router.patch(
  "/users/:id",
  AdminController.updateUserStatus
);

export const AdminRoutes = router;