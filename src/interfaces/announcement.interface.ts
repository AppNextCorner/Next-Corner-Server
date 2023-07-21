import {Document} from "mongoose";

export interface Iannouncements extends Document {
    color: string; 
    header: string;
    description: string;
    image: string;
}