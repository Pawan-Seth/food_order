import { Request, Response, NextFunction } from "express";
import { EditVandorInput, VandorLoginInputs } from "../dto";
import { FindVandor, GetVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";

export const VandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VandorLoginInputs>req.body;
  console.log('email, password', email, password);
  
  const existingVandor = await FindVandor("", email);

  if (existingVandor !== null) {
    console.log("email", existingVandor.password);
    const validation = await ValidatePassword(
      password,
      existingVandor.password,
      existingVandor.salt
    );

    if (validation) {

        const signature = GenerateSignature({
            _id:existingVandor.id,
            email:existingVandor.email,
            foodType:existingVandor.foodType,
            name:existingVandor.name
        })

      return res.json(signature);
    } else {
      return res.json({ message: "Password is not valid" });
    }
  }
  return res.json({ message: "Login credential not valid" });
};
export const GetVandorProfile = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const user = req.user;
    if(user){
        const existingVandor = await FindVandor(user._id)
        return res.json(existingVandor)
    }
  return res.json({ message: "Vandor not found" });
};
export const UpdateVandorProfile = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('checking, update');
  const {foodTypes, address, name, phone} = <EditVandorInput>req.body;
  
  const user = req.user;
  if(user){
      const existingVandor = await FindVandor(user._id)
      if(existingVandor!==null){
        existingVandor.name = name;
        existingVandor.address = address;
        existingVandor.phone = phone;
        existingVandor.foodType = foodTypes;
        const saveResult = await existingVandor.save()
        return res.json(saveResult)
      }
  }
return res.json({ message: "Vandor Information not found" });
};
export const UpdateVandorService =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if(user){
    const existingVandor = await FindVandor(user._id)
    if(existingVandor !== null){
      existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
      const saveResult = await existingVandor.save()
      return res.json(saveResult)
    }
  }
};
