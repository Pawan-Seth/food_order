import { NextFunction } from "express";
import { AuthPaload } from "../dto/Auth.dot";
import { ValidateSignature } from "../utility";
import { Request, Response } from "express";

declare global {
    namespace Express {
        interface Request{
            user?:AuthPaload
        }
    }
}
export const Authenticate = async (req:Request, res:Response, next: NextFunction ) => {
    const validate = await ValidateSignature(req);
    if(validate){
        next()
    }else{
        return res.json({"message":"user not Authorized"})
    }
}