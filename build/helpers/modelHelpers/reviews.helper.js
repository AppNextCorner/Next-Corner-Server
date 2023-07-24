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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewByItemId = exports.updateItemRating = exports.findReviewByItemId = exports.findAll = exports.createReview = void 0;
const reviews_model_1 = require("../../models/reviews.model");
/**
 * Other helper functions
 */
const business_helper_1 = require("./businessModelHelpers/business.helper");
const item_helper_1 = require("./businessModelHelpers/item.helper");
/**
 * end of Other helper functions
 */
const model = reviews_model_1.reviewsModel;
/**
 *
 * This function creates a review in the reviews schema
 *
 * @param incomingReview An incoming review in reviewInterface type
 * @returns
 */
const createReview = (incomingReview) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.create({
        review: incomingReview.review,
        rating: incomingReview.rating,
        user: incomingReview.user,
        idOfItem: incomingReview.idOfItem,
    });
});
exports.createReview = createReview;
/**
 * This function returns all reviews
 * @param selections any selections
 * @returns
 */
const findAll = (selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.find().select(selections);
});
exports.findAll = findAll;
/**
 * This function returns reviews[] of a specific itemId
 * @param id Id of the item not the review
 * @param selections any selections
 * @returns
 */
const findReviewByItemId = (id, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.find({ idOfItem: id }).select(selections);
});
exports.findReviewByItemId = findReviewByItemId;
/**
 * This function updates the rating of an item
 * @param id menuItemId
 */
const updateItemRating = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    // Get vendor by menuItemId
    const vendor = yield (0, business_helper_1.findVendorByMenuItemId)(itemId); // returns vendor as an array for some reason
    // This helper function updates item rating using the vendor id
    const updatedInfo = yield (0, item_helper_1.updateItemRatingByVendorId)(vendor[0]._id.toString(), // get the vendor id
    itemId // put in the menuItemId
    );
    return updatedInfo;
});
exports.updateItemRating = updateItemRating;
const deleteReviewByItemId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.findByIdAndDelete({ id: id }).exec();
});
exports.deleteReviewByItemId = deleteReviewByItemId;
