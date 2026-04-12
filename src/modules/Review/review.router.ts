import express from "express"
import auth, { userRole } from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/",auth(userRole.student),ReviewController.createReview);
router.get("/:tutorId",ReviewController.getTutorReviews);
router.delete("/:id",auth(userRole.admin),ReviewController.deleteReview)

export const ReviewRouter = router;
