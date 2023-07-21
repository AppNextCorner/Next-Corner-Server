"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemModel = exports.optionModel = exports.optionLabelModel = exports.announcementModel = exports.vendorModel = exports.itemSchema = exports.optionsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const announcementsSchema = new mongoose_1.default.Schema({
    color: { type: String },
    header: { type: String },
    description: { type: String },
    image: { type: String },
});
const optionlabelSchema = new mongoose_1.default.Schema({
    label: { type: String },
    selected: { type: Boolean },
    optionId: { type: String },
});
exports.optionsSchema = new mongoose_1.default.Schema({
    name: { type: String },
    type: { type: String },
    optionCustomizations: [optionlabelSchema],
});
exports.itemSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    time: { type: Object, required: true },
    image: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (value) {
                return value !== null && value.length > 0;
            },
            message: "Image is required",
        },
    },
    price: { type: Number, required: true },
    description: { type: String },
    customizations: [exports.optionsSchema],
    category: { type: String, default: "" },
    featured: { type: Boolean, required: true },
    amountInCart: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    storeInfo: { type: Object, required: true },
});
// Hook to see if there are any values
exports.itemSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requiredFields = [
                "name",
                "time",
                "image",
                "price",
                // "category", 
                //"featured",
                "storeInfo",
            ];
            for (const field of requiredFields) {
                if (!this[field] ||
                    (typeof this[field] === "string" && this[field].trim() === "")) {
                    next(new Error(`${field} is required`));
                    return;
                }
            }
            console.log(' no errors');
            next();
        }
        catch (err) {
            console.log('error: ', err);
            next(err);
        }
    });
});
// BUSINESS
const vendorSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    image: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (value) {
                return value !== null && value.length > 0;
            },
            message: "Image is required",
        },
    },
    announcements: {
        cards: [announcementsSchema],
        toggle: { type: Boolean },
    },
    location: { type: Object },
    times: [{ type: Object }],
    itemCategories: [{ type: String }],
    category: {
        name: { type: String, required: true },
        id: { type: Number, required: true },
    },
    menu: [exports.itemSchema],
    uid: { type: String, required: true },
    rating: { type: Number, default: 0 },
    trending: { type: String },
    storeStatus: { type: String, required: true, default: "Not Approved" },
    status: {
        text: { type: String },
        color: { type: String },
    },
}, { timestamps: true });
// Define a pre-save hook to perform the validation
vendorSchema.pre("save", function (next) {
    const requiredFields = [
        "name",
        "image",
        "category",
        "uid",
        "storeStatus",
    ];
    try {
        for (const field of requiredFields) {
            if (!this[field] ||
                (typeof this[field] === "string" && this[field].trim() === "")) {
                next(new Error(`${field} is required`));
                return;
            }
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
vendorSchema.set("toJSON", {
    virtuals: true,
    transform: (_doc, ret, _options) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
});
const vendorModel = mongoose_1.default.model("business", vendorSchema);
exports.vendorModel = vendorModel;
const announcementModel = mongoose_1.default.model("Announcement", announcementsSchema);
exports.announcementModel = announcementModel;
const optionLabelModel = mongoose_1.default.model("OptionLabel", optionlabelSchema);
exports.optionLabelModel = optionLabelModel;
const optionModel = mongoose_1.default.model("Option", exports.optionsSchema);
exports.optionModel = optionModel;
const itemModel = mongoose_1.default.model("Item", exports.itemSchema);
exports.itemModel = itemModel;
