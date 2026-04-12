import { Request, Response } from 'express';
import { BookingService } from './booking.service';
import sendResponse from '../../utils/sendResponse';



const createBooking = async (req: Request, res: Response) => {
  const user = req.user as any; 

  const result = await BookingService.createBooking({
    ...req.body,
    studentId: user?.id, 
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
};


const getAllBookings = async (req: Request, res: Response) => {
    try {
        const result = await BookingService.getAllBookings();
        res.status(201).json({
            success: true,
            message: 'All bookings fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyBookings = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user; 
        const userId = user.userId;
        const role = user.role;

        const result = await BookingService.getMyBookings(userId, role);

        res.status(201).json({
            success: true,
            message: 'My bookings fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { status } = req.body; 

        const result = await BookingService.updateBookingStatus(id as string, status);

        res.status(201).json({
            success: true,
            message: 'Booking status updated successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const cancelBooking = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;  
        const result = await BookingService.cancelBooking(id as string); 
        res.status(201).json({
            success: true,
            message: 'Booking cancelled successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to cancel booking',
        });
    }
};

export const BookingController = {
    createBooking,
    getAllBookings,
    getMyBookings,
    updateBookingStatus,
    cancelBooking
};