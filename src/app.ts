import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import { CategoryRoutes } from './modules/Category/category.route';
import { ReviewRouter } from './modules/Review/review.router';
import { AvailabilityRouter } from './modules/Availability/avaliability.route';
import { CourseRoutes } from './modules/Course/course.route';
import { BookingRoutes } from './modules/Booking/booking.route';
import { AdminRoutes } from './modules/Admin/admin.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);
app.use('/api/v1/categories', CategoryRoutes);
app.use('/api/v1/reviews', ReviewRouter);
app.use('/api/v1/availability', AvailabilityRouter);
app.use('/api/v1/course',CourseRoutes);
app.use('/api/v1/booking',BookingRoutes);
app.use('/api/v1/admin',AdminRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

export default app;
