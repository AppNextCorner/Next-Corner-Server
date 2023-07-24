import mongoose from "mongoose";
import { Iorder } from "../interfaces/order.interface";
declare const orderModel: mongoose.Model<Iorder & mongoose.Document<any, any, any>, {}, {}, {}, any>;
export default orderModel;
