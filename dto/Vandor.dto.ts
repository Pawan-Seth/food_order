export interface CreateVandorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  searviceAvailble: string;
  coverImage: [string];
  rating: number;
  foods: any;
}
export interface VandorLoginInputs{
  email:string;
  password:string;
}
export interface VandorPayload {
  _id:string;
  email:string;
  name:string;
  foodType:[string];
}
export interface EditVandorInput{
  name:string,
  address:string,
  phone:string,
  foodTypes:[string],
}