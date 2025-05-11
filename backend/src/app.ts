import express from 'express';
import apartmentRoutes from './routes/apartment.routes';

const app = express();

app.use(express.json());
app.use('/api/apartments', apartmentRoutes);

export default app;
