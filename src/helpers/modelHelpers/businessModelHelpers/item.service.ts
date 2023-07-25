import { itemModel } from "../../../models/businessModel";
/**
 * Vendor model
 */
import { vendorModel } from "../../../models/businessModel";

/**
 * Other helper functions
 */
import * as storeHelpers from "./business.helper";

/**
 * Mathematical average function
 */
import mathSummationService from "../../../math/sums.math.service";
import { IBusiness } from "../../../interfaces/store.interface";
import ReviewsService from "../reviews/reviews.service";

export default class ItemService {
  private sum = new mathSummationService();
  private reviewsService = new ReviewsService();
  public model = itemModel;
  private businessModel = vendorModel;

  /**
   * This method returns all items
   * @param selections Any selections
   * @returns
   */
  public async findAllItems() {
    const data = await this.businessModel.find().select("menu").exec();
    return data;
  }

  /**
   * This method returns a specific item with its id
   * @param itemId id of the item
   * @returns
   */
  public async findItemById(itemId: string) {
    const allItems = await this.findAllItems();
    const filteredItem = allItems.filter((item) => item.id === itemId);
    return filteredItem;
  }

  /**
   * add comments
   */
  public async findItemsByVendorId(vendorId: string) {
    const vendor = await storeHelpers.findVendorById(vendorId);
    if (vendor) {
      return vendor.menu;
    }
  }
  public async updateItemRating(vendorId: string, itemId: string) {
    // Find the reviwes of the item
    const reviewsList = await this.reviewsService.findReviewsByItemId(itemId);

    // Create a new array of just the rating
    const ratingList = await Promise.all(
      reviewsList.map((currentReview) => currentReview.rating)
    );

    const newRating = await this.sum.average(ratingList, ratingList.length);

    if (isNaN(newRating)) {
     return this.reviewsService.updateRating(vendorId, itemId, 0);
    }
    return this.reviewsService.updateRating(vendorId, itemId, newRating);
  }
}
