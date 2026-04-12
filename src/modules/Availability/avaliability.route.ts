import express from "express";
import auth, { userRole } from "../../middlewares/auth";
import { AvailabilityController } from "./avaliability.controller";


const router = express.Router();

router.post("/",auth(userRole.tutor),AvailabilityController.createAvailability);
router.get("/:tutorId",AvailabilityController.getTutorAvailability);

export const AvailabilityRouter = router;