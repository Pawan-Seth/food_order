import express, {Request, Response, NextFunction } from "express";
import { GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from "../controllers";
import { Authenticate } from "../middlewares/CommonAuth";

const router = express.Router();
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message:"hello from Vandor"})
})
router.post('/login', VandorLogin)
router.use(Authenticate)
router.get('/profile', GetVandorProfile)
router.patch('/profile', UpdateVandorProfile)
router.patch('/services',UpdateVandorService)
export {router as VandorRoute};