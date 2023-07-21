import { itemModel } from "../../../models/businessModel";
/**
 * Vendor model
 */
import { vendorModel } from "../../../models/businessModel";

/**
 * Other helper functions
 */
import { findReviewByItemId } from "../reviews.helper";
import * as storeHelpers from "./business.helper";

/**
 * Mathematical average function
 */
import average from "../../../math/average.math";
import { IBusiness } from "../../../interfaces/store.interface";
const model = itemModel;
const businessModel = vendorModel;

/**
 * This function returns all items
 * @param selections Any selections
 * @returns
 */
const findAllItems = async (selections: any = {}) => {
  const data = await model.find().select(selections).exec();
  return data;
};


// add comments
const findItemById = async( itemId: string, selections: any = {}) => {
  const item = await model.findById(itemId).select(selections).exec();
  return item
}


// add comments
const findItemsByVendorId = async( vendorId: any, selections: any = {}) => {
  const vendor = await storeHelpers.findVendorById(vendorId);
  if(vendor) {
    return vendor.menu;
  }
  return null;
}



/**
 * This function updates the rating of an item by using the itemId and vendorId
 * @param vendorId the id of the vendor
 * @param itemId  the id of the menu item
 * @returns
 */
const updateItemRatingByVendorId = async (vendorId: string, itemId: string) => {
  // Find the reviews of the item
  const reviewsList = await findReviewByItemId(itemId);

  // Create a new array of just the ratings
  const ratingList = await Promise.all(
    reviewsList.map((currentReview) => currentReview.rating)
  );

  /**
   * Use the average function get the average rating
   * ratingList.length is for the number of elements
   */
  const newRating = await average(ratingList, ratingList.length);

  if (isNaN(newRating)) {
    /**
     * Force the rating to 0
     */
    return await businessModel.findByIdAndUpdate(
      vendorId,
      {
        $set: { "menu.$[item].rating": 0 },
      },
      { arrayFilters: [{ "item._id": itemId }], new: true }
    );
  }

  /**
   * Update the item rating
   */
  return await businessModel.findByIdAndUpdate(
    vendorId,
    {
      $set: { "menu.$[item].rating": newRating },
    },
    { arrayFilters: [{ "item._id": itemId }], new: true }
  );
};





export {  findAllItems, findItemById, findItemsByVendorId, updateItemRatingByVendorId };
