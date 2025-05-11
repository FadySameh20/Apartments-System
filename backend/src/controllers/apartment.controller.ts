import { Request, Response } from 'express';
import * as apartmentService from '../services/apartment.service';
import { PaginationDTO, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../dto/pagination.dto';
import { ApartmentFilterDTO } from '../dto/apartment_filter.dto';
import { CreateApartmentDTO } from '../dto/create_apartment.dto';

export const listApartments = async (req: Request, res: Response) => {
  try {
    console.log("Retrieving apartments list...");
    
    // Extract pagination parameters
    const pagination: PaginationDTO = {
      page: parseInt(req.query.page as string) || DEFAULT_PAGE,
      pageSize: parseInt(req.query.pageSize as string) || DEFAULT_PAGE_SIZE
    };
    
    // Extract filter parameters
    const filters: ApartmentFilterDTO = {
      unitNumber: req.query.unitNumber as string || undefined,
      unitName: req.query.unitName as string || undefined,
      projectId: req.query.projectId as string || undefined,
    };
    
    const apartmentsResponse = await apartmentService.getAllApartments(
      pagination,
      filters
    );
    
    res.json(apartmentsResponse);
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
    res.status(500).json({ error: 'Failed to fetch apartment details' });
  }
};

export const createNewApartment = async (req: Request, res: Response) => {
  try {
    console.log("Creating a new apartment...");
    const apartmentData = JSON.parse(req.body.apartmentData) as CreateApartmentDTO;
    const files = req.files as Express.Multer.File[];

    // Check if apartment with same unit number exists
    const existingApartment = await apartmentService.findApartmentByUnitNumber(apartmentData.unitNumber);
    if (existingApartment) {
      return res.status(409).json({ error: 'Apartment with the same unit number exists' });
    }

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
