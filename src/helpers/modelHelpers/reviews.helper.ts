import { reviewInterface } from "../../interfaces/reviews.interface";
import { reviewsModel } from "../../models/reviews.model";

/**
 * Other helper functions
 */
import { findVendorByMenuItemId } from "./businessModelHelpers/business.helper";
import { updateItemRatingByVendorId } from "./businessModelHelpers/item.helper";
/**
 * end of Other helper functions
 */

const model = reviewsModel;

/**
 *
 * This function creates a review in the reviews schema
 *
 * @param incomingReview An incoming review in reviewInterface type
 * @returns
 */
const createReview = async (incomingReview: reviewInterface) => {
  return await model.create({
    review: incomingReview.review,
    rating: incomingReview.rating,
    user: incomingReview.user,
    idOfItem: incomingReview.idOfItem,
  });
};

/**
 * This function returns all reviews
 * @param selections any selections
 * @returns
 */
const findAll = async (selections: any = {}) => {
  return await model.find().select(selections);
};

/**
 * This function returns reviews[] of a specific itemId
 * @param id Id of the item not the review
 * @param selections any selections
 * @returns
 */
const findReviewByItemId = async (id: string, selections: any = {}) => {
  return await model.find({ idOfItem: id }).select(selections);
};

/**
 * This function updates the rating of an item
 * @param id menuItemId
 */
const updateItemRating = async (id: string) => {
  // Get vendor by menuItemId
  const vendor: any = await findVendorByMenuItemId(id); // returns vendor as an array for some reason

  // This helper function updates item rating using the vendor id
  const updatedInfo = await updateItemRatingByVendorId(
    vendor[0]._id.toString(), // get the vendor id
    id // put in the menuItemId
  );
  return updatedInfo;
};

const deleteReviewByItemId = async (id: string) => {
  return await model.findByIdAndDelete(id).exec();
};

export { createReview, findAll, findReviewByItemId, updateItemRating, deleteReviewByItemId };
