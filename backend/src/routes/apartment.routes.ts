import { Router } from 'express';
import {
  createNewApartment
} from '../controllers/apartment.controller';

const apartmentRoutes = Router();

apartmentRoutes.post('/', createNewApartment);

export default apartmentRoutes;
