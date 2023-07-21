import { Document } from "mongoose";
import { IOptions } from "./options.interface";
import { clockFormat } from "./vendorTime.interface";

export interface Iitem extends Document {
  name: string;
  time: clockFormat;
  image: string | null;
  price: number;
  description?: string;
  customizations: IOptions[];
  category?: string;
  featured: boolean;
  amountInCart?: number;
  rating?: number;
  storeInfo: any;

  // Allowing more properties of any type to enter
  [key: string]: any;
}
