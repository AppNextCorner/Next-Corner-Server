"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    orders: [],
    storeInfo: { type: Object, required: true },
    minutesToDone: { type: Number, required: true },
    status: { type: String, required: true },
    accepted: { type: String, required: true, default: "pending" },
    uid: { type: String, required: true },
}, { timestamps: true });
const orderModel = mongoose_1.default.model("order", orderSchema);
exports.default = orderModel;
