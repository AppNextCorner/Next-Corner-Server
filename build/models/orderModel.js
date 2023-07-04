"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    singleOrderList: [],
    timer: { type: Number, required: true },
    orderStatus: { type: String, required: true },
    userId: { type: String, required: true },
}, { timestamps: true });
orderSchema.set('toJSON', {
    virtuals: true,
    transform: (_doc, ret, options) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
});
const orderModel = mongoose_1.default.model('order', orderSchema);
exports.default = orderModel;
