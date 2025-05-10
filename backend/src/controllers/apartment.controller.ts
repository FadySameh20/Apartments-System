import { Request, Response } from 'express';
import * as apartmentService from '../services/apartment.service';

export const listApartments = async (_req: Request, res: Response) => {
  try {
    console.log("Retrieving apartments list...");
    const apartments = await apartmentService.getAllApartments();
    res.json(apartments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch apartments' });
  }
};

export const getApartment = async (req: Request, res: Response) => {
  try {
    console.log("Retrieving apartment details...");
    const id = parseInt(req.params.id);
    const apartment = await apartmentService.getApartmentById(id);
    if (!apartment) {
      res.status(404).json({ error: 'Apartment not found' });
      return;
    }
    res.json(apartment);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching apartment' });
  }
};

export const createNewApartment = async (req: Request, res: Response) => {
  try {
    console.log("Creating a new apartment...");
    const apartmentData = JSON.parse(req.body.apartmentData) as CreateApartmentDTO;
    const files = req.files as Express.Multer.File[];

    // Convert each file to base64
    const base64Images = files.map(file => {
      return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    });

    // Add base64 strings to apartment data
    apartmentData.images = base64Images
    const apartment = await apartmentService.createApartment(apartmentData);
    res.status(201).json(apartment);
  } catch (err) {
    res.status(400).json({ error: 'Error creating apartment', details: err });
  }
};
