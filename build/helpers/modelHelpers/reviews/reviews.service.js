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
const reviews_model_1 = require("../../../models/reviews.model");
const business_helper_1 = require("../businessModelHelpers/business.helper");
const businessModel_1 = require("../../../models/businessModel");
const sums_math_service_1 = __importDefault(require("../../../math/sums.math.service"));
class ReviewsService {
    constructor() {
        this.model = reviews_model_1.reviewsModel;
        this.businessModel = businessModel_1.vendorModel;
        this.sum = new sums_math_service_1.default();
    }
    updateItemRating(vendorId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the reviwes of the item
            const reviewsList = yield this.findReviewsByItemId(itemId);
            // Create a new array of just the rating
            const ratingList = yield Promise.all(reviewsList.map((currentReview) => currentReview.rating));
            const newRating = yield this.sum.average(ratingList, ratingList.length);
            if (isNaN(newRating)) {
                return this.updateRating(vendorId, itemId, 0);
            }
            return this.updateRating(vendorId, itemId, newRating);
        });
    }
    updateRating(vendorId, itemId, newRating) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.businessModel.findByIdAndUpdate(vendorId, { $set: { "menu.$[item].rating": newRating } }, { arrayFilters: [{ "item._id": itemId }] });
        });
    }
    createReview(incomingReview) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create({
                review: incomingReview.review,
                rating: incomingReview.rating,
                user: incomingReview.user,
                idOfItem: incomingReview.idOfItem,
            });
        });
    }
    findAll(selections = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find().select(selections);
        });
    }
    findReviewsByItemId(id, selections = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ idOfItem: id }).select(selections);
        });
    }
    updateItemRatingByItemId(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get vendor by menuItemId
            const vendor = yield (0, business_helper_1.findVendorByMenuItemId)(itemId); // Ensure it returns a single vendor, not an array
            // This helper method updates item rating using the vendor id
            const updatedInfo = yield this.updateItemRating(vendor._id.toString(), itemId);
            return updatedInfo;
        });
    }
    deleteReviewByItemId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndDelete(id).exec();
        });
    }
}
exports.default = ReviewsService;
