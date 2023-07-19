import mongoose from "mongoose";
import { itemSchema } from "./businessModel";

export const cartSchema = new mongoose.Schema(
  {
    inCart: itemSchema,
    storeName: { type: String, required: true },
    uid: { type: String, required: true },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);

export { cartModel };
