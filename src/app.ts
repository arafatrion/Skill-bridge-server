import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import { CategoryRoutes } from './modules/Category/category.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);
app.use('/api/v1/categories', CategoryRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

export default app;
