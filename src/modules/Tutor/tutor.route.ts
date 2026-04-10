import express from "express";
import auth, { userRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";




const router = express.Router();

// Create tutor profile
router.post("/", auth(userRole.tutor), TutorController.createTutor);

router.get(
  "/",
  auth(userRole.student, userRole.tutor, userRole.admin),
  TutorController.getAllTutor
);

router.get("/:id", TutorController.getSingleTutor);

router.put("/profile", auth(userRole.tutor), TutorController.updateTutor);
export const TutorRoutes = router;