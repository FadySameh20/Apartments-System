import { Router } from 'express';
import { listProjects } from '../controllers/project.controller';

const projectRoutes = Router();

projectRoutes.get('/', listProjects);

export default projectRoutes;
