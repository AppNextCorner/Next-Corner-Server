import { reviewInterface } from "../../../interfaces/reviews.interface";
import { reviewsModel } from "../../../models/reviews.model";
import { findVendorByMenuItemId } from "../businessModelHelpers/business.helper";
import { vendorModel } from "../../../models/businessModel";
import ItemService from "../businessModelHelpers/item.service";
import mathSummationService from "../../../math/sums.math.service";

class ReviewsService {
  public model = reviewsModel;
  private businessModel = vendorModel;
  private sum = new mathSummationService();

  public async updateItemRating(vendorId: string, itemId: string) {
    // Find the reviwes of the item
    const reviewsList = await this.findReviewsByItemId(itemId);

    // Create a new array of just the rating
    const ratingList = await Promise.all(
      reviewsList.map((currentReview) => currentReview.rating)
    );

    const newRating = await this.sum.average(ratingList, ratingList.length);

    if (isNaN(newRating)) {
      return this.updateRating(vendorId, itemId, 0);
    }
    return this.updateRating(vendorId, itemId, newRating);
  }

  public async updateRating(
    vendorId: string,
    itemId: string,
    newRating: number
  ) {
    return await this.businessModel.findByIdAndUpdate(
      vendorId,
      { $set: { "menu.$[item].rating": newRating } },
      { arrayFilters: [{ "item._id": itemId }] }
    );
  }

  public async createReview(incomingReview: reviewInterface) {
    return await this.model.create({
      review: incomingReview.review,
      rating: incomingReview.rating,
      user: incomingReview.user,
      idOfItem: incomingReview.idOfItem,
    });
  }

  public async findAll(selections: any = {}) {
    return await this.model.find().select(selections);
  }

  public async findReviewsByItemId(id: string, selections: any = {}) {
    return await this.model.find({ idOfItem: id }).select(selections);
  }

  public async updateItemRatingByItemId(itemId: string) {
    // Get vendor by menuItemId
    const vendor = await findVendorByMenuItemId(itemId); // Ensure it returns a single vendor, not an array

    // This helper method updates item rating using the vendor id
    const updatedInfo = await this.updateItemRating(
      vendor!._id.toString(),
      itemId
    );
    return updatedInfo;
  }

  public async deleteReviewByItemId(id: string) {
    return await this.model.findByIdAndDelete(id).exec();
  }
}

export default ReviewsService;
