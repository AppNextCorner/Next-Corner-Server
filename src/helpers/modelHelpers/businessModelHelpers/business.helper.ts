import { IBusiness } from "../../../interfaces/store.interface";
import { vendorModel } from "../../../models/businessModel";

const model = vendorModel;

const createVendor = async (storeData: IBusiness) => {
  return await model.create({
    name: storeData.name,
    image: storeData.image,
    announcements: storeData.announcements,
    location: storeData.location,
    times: storeData.times,
    categories: storeData.categories,
    menu: storeData.menu,
    uid: storeData.uid,
    categoryId: storeData.categoryId,
    rating: storeData.rating,
    trending: storeData.trending,
    storeStatus: storeData.storeStatus,
    status: storeData.status,
  });
};

/**
 *
 * This helper functions return all vendors
 * @param selections Any selections
 * @returns
 */
const findAllVendors = async (selections: any = {}) => {
  const vendorList = await model.find().select(selections).exec();
  return vendorList;
};

/**
 *
 * This helper function returns vendor (as an array for some reason) with just the name
 *
 * @param nameOfBusiness The name of the business/vendor
 * @param selections Any selections
 * @returns
 */
const findVendorByName = async (
  nameOfBusiness: string,
  selections: any = {}
) => {
  const businessData = await model
    .find({ name: nameOfBusiness })
    .select(selections)
    .exec();
  return businessData;
};

/**
 * This function finds a vendor with the id of the item the vender offers
 * @param id menuItemid
 * @param selections Any selections
 * @returns vendor as an array for some reason?
 */
const findVendorByMenuItemId = async (id: string, selections: any = {}) => {
  const vendor = await model.find({ "menu._id": id }).select(selections).exec();
  return vendor;
};

export {
  createVendor,
  findAllVendors,
  findVendorByName,
  findVendorByMenuItemId,
};
