import { Document } from "mongoose";

export interface Icategory extends Document {
    category: string;
}