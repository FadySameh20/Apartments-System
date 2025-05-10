import { Request, Response } from 'express';
import * as developerService from '../services/developer.service';

export const listDevelopers = async (_req: Request, res: Response) => {
  try {
    console.log("Retrieving developers list...");
    const developers = await developerService.getAllDeveloeprs();
    res.json(developers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch developers' });
  }
};
