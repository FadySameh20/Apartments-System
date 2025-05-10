import { Router } from 'express';
import {
  listApartments,
  getApartment,
  createNewApartment
} from '../controllers/apartment.controller';
import multer from 'multer';

const apartmentRoutes = Router();
const upload = multer();

apartmentRoutes.get('/', listApartments);
apartmentRoutes.get('/:id', getApartment);
apartmentRoutes.post('/', upload.none(), createNewApartment);

export default apartmentRoutes;
