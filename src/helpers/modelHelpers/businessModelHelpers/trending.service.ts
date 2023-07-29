import mathSummationService from "../../../math/sums.math.service";
import { vendorModel } from "../../../models/businessModel";
import { findVendorByMenuItemId } from "./business.helper";

export default class TrendingService {
  private businessModel = vendorModel;
  private sum = new mathSummationService();

  public async updateVendorRating(idOfItem: string) {
    const vendor = await findVendorByMenuItemId(idOfItem);
    if (vendor) {
      const itemRatings = await Promise.all(
        vendor.menu.map((item) => item.rating)
      );

      console.log("itemRatings: ", itemRatings)
      const vendorRating: number = await this.sum.average(
        itemRatings as number[],
        itemRatings.length
      );

      console.log("venodor rating:", vendorRating)

      if (isNaN(vendorRating)) {
        return await this.businessModel.findByIdAndUpdate(
          vendor._id,
          {
            rating: 0,
          },
          {
            new: true,
          }
        );
      }

      return await this.businessModel.findByIdAndUpdate(
        vendor._id,
        {
          rating: vendorRating,
        },
        { new: true }
      );
    }
    console.log("Vendor doesn't exist!");
  }

  public async setBestReviews() {
    let largest = 0;

    const allVendors = await this.businessModel.find().exec();
    const allVendorRatings = await Promise.all(
      allVendors.map((vendor) => vendor.rating)
    );
    for (let i = 0; i < allVendorRatings.length - 1; i++) {
      let currentRating = allVendorRatings[i];
      if (currentRating > largest) {
        largest = currentRating;
      }
    }

    const highestRatedVendor = allVendors[allVendorRatings.indexOf(largest)];

    return this.businessModel.findByIdAndUpdate(
      highestRatedVendor._id,
      { trending: "Best Reviews" },
      { new: true }
    );
  }
}
