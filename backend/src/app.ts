import express from 'express';
import apartmentRoutes from './routes/apartment.routes';
import cors from 'cors';
import projectRoutes from './routes/project.routes';

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4000',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

app.use('/api/apartments', apartmentRoutes);
app.use('/api/projects', projectRoutes);

export default app;
