import { reviewInterface } from "../../interfaces/reviews.interface";
import { reviewsModel } from "../../models/reviews.model";

/**
 * Other helper methods
 */
import { findVendorByMenuItemId } from "./businessModelHelpers/business.helper";
import { updateItemRatingByVendorId } from "./businessModelHelpers/item.helper";
/**
 * end of Other helper methods
 */

const model = reviewsModel;

class ReviewsHelper {
  /**
   *
   * This method creates a review in the reviews schema
   *
   * @param incomingReview An incoming review in reviewInterface type
   * @returns
   */
  public async createReview(incomingReview: reviewInterface) {
    return await model.create({
      review: incomingReview.review,
      rating: incomingReview.rating,
      user: incomingReview.user,
      idOfItem: incomingReview.idOfItem,
    });
  }

  /**
   * This method returns all reviews
   * @param selections any selections
   * @returns
   */
  public async findAll(selections: any = {}) {
    return await model.find().select(selections);
  }

  /**
   * This method returns reviews[] of a specific itemId
   * @param id Id of the item not the review
   * @param selections any selections
   * @returns
   */
  public async findReviewByItemId(id: string, selections: any = {}) {
    return await model.find({ idOfItem: id }).select(selections);
  }

  /**
   * This method updates the rating of an item
   * @param id menuItemId
   */
  public async updateItemRating(itemId: string) {
    // Get vendor by menuItemId
    const vendor: any = await findVendorByMenuItemId(itemId); // returns vendor as an array for some reason

    // This helper method updates item rating using the vendor id
    const updatedInfo = await updateItemRatingByVendorId(
      vendor[0]._id.toString(), // get the vendor id
      itemId // put in the menuItemId
    );
    return updatedInfo;
  }

  public async deleteReviewByItemId(id: string) {
    return await model.findByIdAndDelete({ id: id }).exec();
  }
}

export default ReviewsHelper;
