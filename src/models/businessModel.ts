import mongoose, { Document } from "mongoose";
import { IBusiness } from "../interfaces/store.interface";

const categorySchema = new mongoose.Schema({
  category: { type: String },
});

const announcementsSchema = new mongoose.Schema({
  color: { type: String },
  header: { type: String },
  description: { type: String },
  image: { type: String },
});

const optionlabelSchema = new mongoose.Schema({
  label: { type: String },
  selected: { type: Boolean },
  optionId: { type: String },
});

const optionsSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  optionCustomizations: [optionlabelSchema],
});

const itemSchema = new mongoose.Schema({
  name: { type: String },
  time: { type: Number },
  image: { type: String },
  price: { type: Number },
  description: { type: String },
  customizations: [optionsSchema],
  category: { type: String },
  featured: { type: Boolean },
  amountInCart: { type: Number },
  rating: { type: Number },
});

const statusSchema = new mongoose.Schema({
  text: { type: String },
  color: { type: String },
});
// BUSINESS
const vendorSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String || null },
    announcements: {
      cards: [announcementsSchema],
      toggle: { type: Boolean },
    },
    location: { type: Object },
    times: [{ type: Object }],
    categories: [categorySchema],
    menu: [itemSchema],
    uid: { type: String },
    categoryId: { type: Number },
    rating: { type: Number },
    trending: { type: String },
    storeStatus: { type: String, required: true, default: "Not Approved" },
    status: statusSchema,
  },
  { timestamps: true }
);
vendorSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc: any, ret: any, _options: any) => {
    delete ret.__v;
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const vendorModel = mongoose.model<IBusiness & Document>(
  "business",
  vendorSchema
);
const categoryModel = mongoose.model("Category", categorySchema);
const announcementModel = mongoose.model("Announcement", announcementsSchema);
const optionLabelModel = mongoose.model("OptionLabel", optionlabelSchema);
const optionModel = mongoose.model("Option", optionsSchema);
const itemModel = mongoose.model("Item", itemSchema);

export {
  vendorModel,
  categoryModel,
  announcementModel,
  optionLabelModel,
  optionModel,
  itemModel,
};
