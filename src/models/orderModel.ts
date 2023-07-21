import mongoose, { Document } from "mongoose";
import { Iorder } from "../interfaces/order.interface";

const orderSchema = new mongoose.Schema(
  {
    orders: [],
    minutesToDone: { type: Number, required: true },
    status: { type: String, required: true },
    accepted: { type: String, required: true, default: "pending"},
    uid: { type: String, required: true },
  },
  { timestamps: true }
);

const orderModel = mongoose.model<Iorder & Document>("order", orderSchema);

export default orderModel;
