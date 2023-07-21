import { Document } from "mongoose";

export interface Icategory extends Document {
    name: string;
    id: number;
}