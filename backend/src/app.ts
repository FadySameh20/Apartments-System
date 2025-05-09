import express from 'express';
import apartmentRoutes from './routes/apartment.routes';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4000',
}));

app.use('/api/apartments', apartmentRoutes);

export default app;
