import mongoose, { CallbackError, Document } from "mongoose";
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

const itemSchema = new mongoose.Schema<Iitem>({
  name: { type: String, required: true },
  time: { type: Object, required: true },
  image: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (value: string | null) {
        return value !== null && value.length > 0;
      },
      message: "Image is required",
    },
  },
  price: { type: Number, required: true },
  description: { type: String },
  customizations: [optionsSchema],
  category: { type: String },
  featured: { type: Boolean, required: true },
  amountInCart: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  storeInfo: { type: Object, required: true },
});




// Hook to see if there are any values
itemSchema.pre<Iitem>("save", async function (next) {
  try {
    const requiredFields: string[] = [
      "name",
      "time",
      "image",
      "price",
      "category",
      "featured",
      "storeInfo",
    ];
    for (const field of requiredFields) {
      if (
        !this[field] ||
        (typeof this[field] === "string" && this[field].trim() === "")
      ) {
        next(new Error(`${field} is required`));
        return;
      }
    }
    console.log(' no errors')
    next();
  } catch (err: any) {
    console.log('error: ', err)
    next(err);
  }
});

// BUSINESS
const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (value: string | null) {
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

// Define a pre-save hook to perform the validation
vendorSchema.pre<IBusiness>("save", function (next) {
  const requiredFields: string[] = [
    "name",
    "image",
    "category",
    "uid",
    "storeStatus",
  ];

  try {
    for (const field of requiredFields) {
      if (
        !this[field] ||
        (typeof this[field] === "string" && this[field].trim() === "")
      ) {
        next(new Error(`${field} is required`));
        return;
      }
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

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
