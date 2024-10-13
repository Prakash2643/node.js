import express from 'express';
import itemRoutes from './itemRoutes.ts';
import errorHandler from '../middlewares/errorHandler.ts';

const app = express();
app.use(express.json());
app.use('/api', itemRoutes);
app
