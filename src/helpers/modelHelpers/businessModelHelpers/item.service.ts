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
import { IBusiness } from "../../../interfaces/store.interface";
import { Iitem } from "../../../interfaces/item.interface";

export default class ItemService {
  public model = itemModel;
  private businessModel = vendorModel;

  /**
   * This method returns all items
   * @param selections Any selections
   * @returns
   */
  public async findAllItems(): Promise<Iitem[]> {
    // Get all items from the property menu as a Promise
    const data = await this.businessModel.find().select("menu").exec();

    // An array of all items from every vendor
    const allItems: Iitem[] = data.reduce(
      // Iterate through all items in all vendors
      (items: Iitem[], business: IBusiness) => {
        // For every vendor, concatenate its "menu" array to the "items" array.
        // The "concat" method combines the "menu" array of the current business with the "items" array.
        // This process is done for each business in the "data" array, effectively merging all the "menu" arrays together.
        return items.concat(business.menu);
      },
      // Initial state of the menu items
      []
    );

    return allItems;
  }

  /**
   * This method returns a specific item with its id
   * @param itemId id of the item
   * @returns
   */
  public async findItemById(itemId: string): Promise<Iitem[]> {
    const allItems = await this.findAllItems();
    const filteredItems: Iitem[] = allItems.filter(
      (item) => item.id === itemId
    );
    return filteredItems;
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
}
