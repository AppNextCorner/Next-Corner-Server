import mongoose from "mongoose";
import { cartSchema } from "./cartModel";

const orderSchema = new mongoose.Schema(
  {
    orders: [cartSchema],
    minutesToDone: { type: Number, required: true },
    status: { type: String, required: true },
    accepted: { type: String, required: true, default: "pending"},
    uid: { type: String, required: true },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
