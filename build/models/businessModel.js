"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemModel = exports.optionModel = exports.optionLabelModel = exports.announcementModel = exports.categoryModel = exports.vendorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    category: { type: String },
});
const announcementsSchema = new mongoose_1.default.Schema({
    color: { type: String },
    header: { type: String },
    description: { type: String },
    image: [{ type: String }],
});
const optionlabelSchema = new mongoose_1.default.Schema({
    label: { type: String },
    selected: { type: Boolean },
    optionId: { type: String },
});
const optionsSchema = new mongoose_1.default.Schema({
    name: { type: String },
    type: { type: String },
    optionCustomizations: [optionlabelSchema],
});
const itemSchema = new mongoose_1.default.Schema({
    name: { type: String },
    time: { type: Number },
    image: [{ type: String }],
    price: { type: Number },
    description: { type: String },
    customizations: [optionsSchema],
    category: { type: String },
    featured: { type: Boolean },
    amountInCart: { type: Number },
    rating: { type: Number },
});
const statusSchema = new mongoose_1.default.Schema({
    text: { type: String },
    color: { type: String },
});
// BUSINESS
const vendorSchema = new mongoose_1.default.Schema({
    name: { type: String },
    image: [{ type: String || null }],
    announcements: [announcementsSchema],
    location: { type: Object },
    open: { type: String },
    close: { type: String },
    categories: [categorySchema],
    menu: [itemSchema],
    userId: { type: String },
    categoryId: { type: Number },
    rating: { type: Number },
    trending: { type: String },
    status: statusSchema,
}, { timestamps: true });
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
const categoryModel = mongoose_1.default.model("Category", categorySchema);
exports.categoryModel = categoryModel;
const announcementModel = mongoose_1.default.model("Announcement", announcementsSchema);
exports.announcementModel = announcementModel;
const optionLabelModel = mongoose_1.default.model("OptionLabel", optionlabelSchema);
exports.optionLabelModel = optionLabelModel;
const optionModel = mongoose_1.default.model("Option", optionsSchema);
exports.optionModel = optionModel;
const itemModel = mongoose_1.default.model("Item", itemSchema);
exports.itemModel = itemModel;
