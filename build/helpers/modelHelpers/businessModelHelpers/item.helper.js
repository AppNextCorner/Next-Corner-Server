"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateItemRatingByVendorId = exports.findItemsByVendorId = exports.findItemById = exports.findAllItems = void 0;
const businessModel_1 = require("../../../models/businessModel");
/**
 * Vendor model
 */
const businessModel_2 = require("../../../models/businessModel");
/**
 * Other helper functions
 */
const reviews_helper_1 = require("../reviews.helper");
const storeHelpers = __importStar(require("./business.helper"));
/**
 * Mathematical average function
 */
const average_math_1 = __importDefault(require("../../../math/average.math"));
const model = businessModel_1.itemModel;
const businessModel = businessModel_2.vendorModel;
/**
 * This function returns all items
 * @param selections Any selections
 * @returns
 */
const findAllItems = (selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield model.find().select(selections).exec();
    return data;
});
exports.findAllItems = findAllItems;
// add comments
const findItemById = (itemId, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield model.findById(itemId).select(selections).exec();
    return item;
});
exports.findItemById = findItemById;
// add comments
const findItemsByVendorId = (vendorId, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield storeHelpers.findVendorById(vendorId);
    if (vendor) {
        return vendor.menu;
    }
    return null;
});
exports.findItemsByVendorId = findItemsByVendorId;
/**
 * This function updates the rating of an item by using the itemId and vendorId
 * @param vendorId the id of the vendor
 * @param itemId  the id of the menu item
 * @returns
 */
const updateItemRatingByVendorId = (vendorId, itemId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the reviews of the item
    const reviewsList = yield (0, reviews_helper_1.findReviewByItemId)(itemId);
    // Create a new array of just the ratings
    const ratingList = yield Promise.all(reviewsList.map((currentReview) => currentReview.rating));
    /**
     * Use the average function get the average rating
     * ratingList.length is for the number of elements
     */
    const newRating = yield (0, average_math_1.default)(ratingList, ratingList.length);
    if (isNaN(newRating)) {
        /**
         * Force the rating to 0
         */
        return yield businessModel.findByIdAndUpdate(vendorId, {
            $set: { "menu.$[item].rating": 0 },
        }, { arrayFilters: [{ "item._id": itemId }], new: true });
    }
    /**
     * Update the item rating
     */
    return yield businessModel.findByIdAndUpdate(vendorId, {
        $set: { "menu.$[item].rating": newRating },
    }, { arrayFilters: [{ "item._id": itemId }], new: true });
});
exports.updateItemRatingByVendorId = updateItemRatingByVendorId;
