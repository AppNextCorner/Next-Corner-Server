"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    // Review mesg
    review: { type: String, default: "" },
    // Rating
    rating: { type: Number, required: true },
    // The user who sent the rating
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Next Corner User",
        required: true,
    },
    // The id of the item being reviewed
    idOfItem: { type: String, required: true },
}, {
    timeStamps: {
        createdAt: "createdOn",
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.reviewsModel = (0, mongoose_1.model)("reviews", schema);
