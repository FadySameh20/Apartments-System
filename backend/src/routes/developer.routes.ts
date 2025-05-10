import { Router } from 'express';
import { listDevelopers } from '../controllers/developer.controller';

const developerRoutes = Router();

developerRoutes.get('/', listDevelopers);

export default developerRoutes;
