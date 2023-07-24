import { Document } from "mongoose";
export interface Istatus extends Document {
    text: string;
    color: string;
}
