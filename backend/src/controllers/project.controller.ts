import { Request, Response } from 'express';
import * as projectService from '../services/project.service';

export const listProjects = async (_req: Request, res: Response) => {
  try {
    console.log("Retrieving projects list...");
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};
