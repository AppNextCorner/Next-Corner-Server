import mongoose from "mongoose";
import { userInterface } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model<userInterface & mongoose.Document>("user", userSchema);

export { userModel };
