import { Router, Request, Response } from 'express';

const healthRoutes = Router();

healthRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).json("Server Condition: Healthy");
});

export default healthRoutes;
