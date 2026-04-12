import express from 'express';
import auth, { userRole } from '../../middlewares/auth';
import { BookingController } from './booking.controller';


const router = express.Router();


router.post('/',auth(userRole.student),BookingController.createBooking);
router.get('/',auth(userRole.admin,userRole.student,userRole.tutor),BookingController.getAllBookings);
router.get('/:id',auth(userRole.admin,userRole.student,userRole.tutor),BookingController.getMyBookings);
router.patch('/:id',auth(userRole.admin,userRole.tutor),BookingController.updateBookingStatus);
router.delete('/:id',auth(userRole.admin,userRole.student),BookingController.cancelBooking);

export const BookingRoutes = router;