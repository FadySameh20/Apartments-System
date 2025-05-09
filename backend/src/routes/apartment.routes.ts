import { Router } from 'express';
import {
  listApartments,
  createNewApartment
} from '../controllers/apartment.controller';

const apartmentRoutes = Router();

apartmentRoutes.get('/', listApartments);
apartmentRoutes.post('/', createNewApartment);

export default apartmentRoutes;
