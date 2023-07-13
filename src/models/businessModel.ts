import mongoose, { Document } from "mongoose";
import { IBusiness } from "../interfaces/store.interface";
import { Iitem } from "../interfaces/item.interface";

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
  time: { type: Object },
  image: { type: String },
  price: { type: Number },
  description: { type: String },
  customizations: [optionsSchema],
  category: { type: String },
  featured: { type: Boolean },
  amountInCart: { type: Number },
  rating: { type: Number },
  storeInfo: { type: Object },
});

// BUSINESS
const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String || null, required: true },
    announcements: {
      cards: [announcementsSchema],
      toggle: { type: Boolean },
    },
    location: { type: Object },
    times: [{ type: Object }],
    itemCategories: [{ type: String }],
    category: {
      name: { type: String, required: true },
      id: { type: Number, required: true},
    },
    menu: [itemSchema],
    uid: { type: String, required: true },
    rating: { type: Number, default: 0 },
    trending: { type: String },
    storeStatus: { type: String, required: true, default: "Not Approved" },
    status: {
      text: { type: String },
      color: { type: String },
    },
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
const announcementModel = mongoose.model("Announcement", announcementsSchema);
const optionLabelModel = mongoose.model("OptionLabel", optionlabelSchema);
const optionModel = mongoose.model("Option", optionsSchema);
const itemModel = mongoose.model<Iitem & Document>("Item", itemSchema);

export {
  vendorModel,
  announcementModel,
  optionLabelModel,
  optionModel,
  itemModel,
};
