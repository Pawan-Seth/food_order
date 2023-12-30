import express, {Request, Response, NextFunction } from "express";
import { CreateVandor, GetVandor, GetVandorByID } from "../controllers";
const router = express.Router();
 router.get('/vandor', GetVandor)
 router.post('/vandors', CreateVandor)
 router.get('vandor/:id', GetVandorByID)
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message:"hello from Admin"})
})

export {router as AdminRoute};