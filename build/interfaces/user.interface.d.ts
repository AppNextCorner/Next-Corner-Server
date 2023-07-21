import { Types } from "mongoose";
/**
 * The interface of the user
 */
export interface userInterface {
    _id: Types.ObjectId;
    lastName: string;
    firstName: string;
    phoneNumber: number;
    email: string;
    password: string;
    role: string;
}
