import { Router } from 'express';
import {
  listApartments,
  getApartment,
  createNewApartment
} from '../controllers/apartment.controller';
import multer from 'multer';

const apartmentRoutes = Router();
const upload = multer({ storage: multer.memoryStorage() });

apartmentRoutes.get('/', listApartments);
apartmentRoutes.get('/:id', getApartment);
apartmentRoutes.post('/', upload.array('images'), createNewApartment);

export default apartmentRoutes;
