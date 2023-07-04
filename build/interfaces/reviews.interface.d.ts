import { Document, Types } from "mongoose";
import { userInterface } from "./user.interface";
/**
 * Interface for reviews
 */
export interface reviewInterface extends Document {
    _id: Types.ObjectId;
    idOfItem: string;
    review: string;
    rating: number;
    user: userInterface;
    createdOn: Date;
}
