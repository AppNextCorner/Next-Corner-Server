import { reviewInterface } from "../../interfaces/reviews.interface";
import { reviewsModel } from "../../models/reviews.model";

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

export { createReview, findAll, findReviewByItemId };
