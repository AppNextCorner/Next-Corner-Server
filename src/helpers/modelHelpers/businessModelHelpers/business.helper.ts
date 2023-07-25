import { Document, Model, ObjectId } from "mongoose";
import { IBusiness } from "../../../interfaces/store.interface";
import { vendorModel } from "../../../models/businessModel";
import { Iitem } from "../../../interfaces/item.interface";
import ItemService from "./item.service";

const model = vendorModel;

const itemHelpers = new ItemService();
const createVendor = async (storeData: IBusiness): Promise<IBusiness> => {
  return await model.create({
    name: storeData.name,
    image: storeData.image,
    announcements: storeData.announcements,
    location: storeData.location,
    times: storeData.times,
    category: storeData.category,
    menu: storeData.menu,
    uid: storeData.uid,
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

const findAllVendorMenus = async (selections: any = {}) => {
  const vendorList = await model.find().select(selections).exec();
  const menuList = Promise.all(
    vendorList.map((currentVendor) => currentVendor.menu)
  );
  return menuList;
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

// add comments
const findVendorByMenuItemId = async (itemId: string) => {
  const item: any = await itemHelpers.findItemById(itemId);
  const vendor = await findVendorById(item.storeInfo.storeId);
  return vendor;
};

// add comments
const findVendorByUid = async (uid: string, selections: any = {}) => {
  const vendor = await model.find({ uid: uid }).select(selections).exec();
  return vendor;
};

const findVendorById = async (
  vendorId: string,
  selections: any = {}
): Promise<
  (IBusiness & Document<any, any, any> & { _id: ObjectId }) | null
> => {
  const vendor = await model.findById(vendorId).select(selections).exec();
  return vendor;
};

/**
 *
 * @param id menu item id / vendor id / announcement id ...
 * @param property what property we want to add to
 * @param newData the data we want to replace with the property
 * @returns
 */
const updateProperty = async (
  id: string | undefined,
  property: string,
  newData: any
) => {
  const updated = await model.findByIdAndUpdate(
    id,
    { [property]: newData },
    { new: true }
  );
  return updated;
};

/**
 *  Adds a new menu item to the menu list
 * @param id Store ID
 * @param newMenu The menu item we want to add to the menu list
 * @returns the store object

 */
const uploadMenu = async (
  storeId: string,
  newMenu: Iitem[],
  test?: boolean
): Promise<
  (IBusiness & Document<any, any, any> & { _id: ObjectId }) | null
> => {
  const vendor = await findVendorById(storeId);
  // Combine both the prev menu with the new menu item
  if (!test) {
    const payload = [...vendor?.menu!, ...newMenu];
    const updatedVendor = updateProperty(storeId, "menu", payload);
    return updatedVendor;
  } else {
    const testVendor = updateProperty(storeId, "menu", vendor?.menu);
    return testVendor;
  }
};

/**
 *
 */
const updateMenu = async (
  storeId: string,
  newMenu: Iitem[]
): Promise<
  (IBusiness & Document<any, any, any> & { _id: ObjectId }) | null
> => {
  if (newMenu.length > 1) {
    console.log("Updating more than one item");
    return null;
  }

  // get the vendor
  const vendor = await findVendorById(storeId);

  if (vendor) {
    // get previous items excluding the one we're trying to upload
    // this is so that we don't get duplicates -> Could be used for updating by removing previous old item
    const previousItems = vendor?.menu!.filter(
      (item) => item._id !== newMenu[0]._id
    );
    // concat previous items(without old menu) and new menu item
    const payload = [...previousItems!, ...newMenu];
    const updatedVendor = updateProperty(storeId, "menu", payload);
    return updatedVendor;
  }
  console.log("vendor not found");
  return null;
};

/**
 * @param itemId
 * @param updatedItem - Item Object to replace the old item with
 */
const updateMenuItem = async (updatedItem: Iitem[]) => {
  const storeId: string = updatedItem[0].storeInfo.storeId;

  // Update the menu with updated data
  const uploadedMenu = await updateMenu(storeId, updatedItem);
  return uploadedMenu!
};

export {
  createVendor,
  findAllVendors,
  findVendorByName,
  findVendorByUid,
  findVendorById,
  findVendorByMenuItemId,
  updateProperty,
  updateMenu,
  updateMenuItem,
};
