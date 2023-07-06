"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    cartData: {
        property: { type: String, },
        name: { type: String, required: true },
        itemId: { type: Number, required: true },
        time: { type: Number, required: true },
        image: { type: Object, required: true },
        price: { type: Number, required: true },
        customizations: [],
        description: { type: String },
        amountInCart: { type: Number, required: true },
        category: { type: String, required: true },
        rating: { type: Number, required: true }
    },
    businessOrderedFrom: { type: String, required: true },
    userId: { type: String, required: true },
    location: { type: Object },
    logo: { type: Object },
}, { timestamps: true });
cartSchema.set('toJSON', {
    virtuals: true,
    transform: (_doc, ret, _options) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
});
const cartModel = mongoose_1.default.model('cart', cartSchema);
exports.cartModel = cartModel;
