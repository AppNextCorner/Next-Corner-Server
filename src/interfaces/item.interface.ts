import {Document} from "mongoose"
import { IOptions } from "./options.interface";


export interface Iitem extends Document {
    _id: string;
    name: string;
    time: number;
    image: string;
    price: number; 
    description: string;
    customizations: IOptions[];
    category: string;
    featured: boolean;
    amountInCart: number;
    rating: number;
    createdAt?: string;
}