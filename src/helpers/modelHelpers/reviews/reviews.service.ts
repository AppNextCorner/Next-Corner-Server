import { reviewInterface } from "../../../interfaces/reviews.interface";
import { reviewsModel } from "../../../models/reviews.model";
import { findVendorByMenuItemId } from "../businessModelHelpers/business.helper";
import { vendorModel } from "../../../models/businessModel";
import ItemService from "../businessModelHelpers/item.service";


class ReviewsService {
  public model = reviewsModel;
  private businessModel = vendorModel;
  private itemService = new ItemService();


  public async updateRating(vendorId: string, itemId: string, newRating: number){
    return await this.businessModel.findByIdAndUpdate(
      vendorId,
      {
        $set: { "menu.$[item].rating": newRating },
      },
      { arrayFilters: [{ "item._id": itemId }], new: true }
    );
  }

  /**
   *
   * This method creates a review in the reviews schema
   *
   * @param incomingReview An incoming review in reviewInterface type
   * @returns
   */
  public async createReview(incomingReview: reviewInterface) {
    return await this.model.create({
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
    return await this.model.find().select(selections);
  }

  /**
   * This method returns reviews[] of a specific itemId
   * @param id Id of the item not the review
   * @param selections any selections
   * @returns
   */
  public async findReviewsByItemId(id: string, selections: any = {}) {
    return await this.model.find({ idOfItem: id }).select(selections);
  }

  /**
   * This method updates the rating of an item
   * @param id menuItemId
   */
  public async updateItemRating(itemId: string) {
    // Get vendor by menuItemId
    const vendor: any = await findVendorByMenuItemId(itemId); // returns vendor as an array for some reason

    // This helper method updates item rating using the vendor id
    const updatedInfo = await this.itemService.updateItemRating(
      vendor[0]._id.toString(), // get the vendor id
      itemId // put in the menuItemId
    );
    return updatedInfo;
  }

  public async deleteReviewByItemId(id: string) {
    return await this.model.findByIdAndDelete({ id: id }).exec();
  }
}

export default ReviewsService;
