import mongoose from "mongoose";
import { userInterface } from "../interfaces/user.interface";
declare const userModel: mongoose.Model<userInterface & mongoose.Document<any, any, any>, {}, {}, {}, any>;
export { userModel };
