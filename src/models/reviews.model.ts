import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    // Review mesg
    review: { type: String, default: "" },
    // Rating
    rating: { type: Number, required: true },
    // The user who sent the rating
    user: {
      type: Schema.Types.ObjectId,
      ref: "Next Corner User",
      required: true,
    },
  },
  {
    timeStamps: {
      createdAt: "createdOn",
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const reviewsModel = model("reviews", schema);
