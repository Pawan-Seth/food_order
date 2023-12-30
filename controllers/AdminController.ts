import { NextFunction, Request, Response } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVandor = async (id:string | undefined, email?: string ) => {
  if(email){
    return await Vandor.findOne({email:email})
  }
  else{
    return await Vandor.findById(id)
  }
}

export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    ownerName,
    pincode,
    password,
    phone,
    email,
    foodType,
  } = <CreateVandorInput>req.body;
  const existingUser = await FindVandor('', email)
  if(existingUser !== null){
    return res.json({"message":"A Vendor is exist with this email Id"})
  }
  //generate Salt
  const salt = await GenerateSalt()
  const userPassword = await GeneratePassword(password, salt)
  //encrypt the password using the salt
  const CreateVandor = await Vandor.create({
    name: name,
    address: address,
    ownerName: ownerName,
    pincode: pincode,
    password: userPassword,
    phone: phone,
    email: email,
    salt:salt,
    foodType: foodType,
    rating:0,
    serviceAvailable:false,
    coverImages:[],

  });
// console.log('res.json(CreateVandor)', res.json(CreateVandor));

  return res.json(CreateVandor);
};
export const GetVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vandor = await Vandor.find()

  if(vandor !== null){
    return res.json(vandor)
  }
  return res.json({"message":"vandors data not availble"})

};
export const GetVandorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const vandorId = req.params.id;
  const vandor = await Vandor.findById(vandorId)

  if(vandor !== null){
    return res.json(vandor);
  }
  return res.json({"message":"vandors data not availble"})
};
