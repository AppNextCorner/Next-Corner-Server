import { itemModel } from "../../../models/businessModel";
/**
 * Vendor model
 */
import { vendorModel } from "../../../models/businessModel";

/**
 * Other helper functions
 */
import { findReviewByItemId } from "../reviews.helper";

/**
 * Mathematical average function
 */
import average from "../../../math/average.math";
const model = itemModel;
const businessModel = vendorModel;

/**
 * This function returns all items
 * @param selections Any selections
 * @returns
 */
const findAllItems = async (selections: any = {}) => {
  const data = await model.find().select(selections).exec();
  console.log(data);
  return await model.find().select(selections);
};

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

export { findAllItems, updateItemRatingByVendorId };
