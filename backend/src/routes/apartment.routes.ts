import { Router } from 'express';
import {
  listApartments,
  getApartment,
  createNewApartment
} from '../controllers/apartment.controller';

const apartmentRoutes = Router();

apartmentRoutes.get('/', listApartments);
apartmentRoutes.get('/:id', getApartment);
apartmentRoutes.post('/', createNewApartment);

export default apartmentRoutes;
