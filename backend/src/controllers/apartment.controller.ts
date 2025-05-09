import { Request, Response } from 'express';
import * as apartmentService from '../services/apartment.service';

export const createNewApartment = async (req: Request, res: Response) => {
  try {
    const apartment = await apartmentService.createApartment(req.body);
    res.status(201).json(apartment);
  } catch (err) {
    res.status(400).json({ error: 'Error creating apartment', details: err });
  }
};
