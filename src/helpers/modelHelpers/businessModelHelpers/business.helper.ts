import { Document, ObjectId } from "mongoose";
import { IBusiness } from "../../../interfaces/store.interface";
import * as itemHelpers from "./item.helper"
import { vendorModel } from "../../../models/businessModel";
import { Iitem } from "../../../interfaces/item.interface";

const model = vendorModel;

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
const findVendorByMenuItemId = async(itemId: string) => {
  const item = await itemHelpers.findItemById(itemId);
  if(item){
    const vendor = await findVendorByName(item.storeInfo.storeName);
    return vendor;
  }
  return null;
}

// add comments
const findVendorByUid = async(uid: string, selections: any ={} ) => {
  const vendor = await model.find({"uid" : uid}).select(selections).exec();
  return vendor;
}

const findVendorById = async(vendorId: string, selections: any = {} ) => {
  const vendor = await model.findById(vendorId).select(selections).exec();
  return vendor;
}


/**
 * 
 * @param id menu item id / vendor id / announcement id ...
 * @param property what property we want to add to
 * @param newData the data we want to replace with the property
 * @returns 
 */
const updateProperty = async(id: string | undefined, property: string, newData: any) => {
  const updated = await model.findByIdAndUpdate(id, {[property]: newData}, {new: true});
  return updated;
}

// add comments
const updateMenu = async(id: string, newMenu: Iitem[]) => {
  const vendor = await findVendorById(id);
  const payload = [...vendor?.menu!, ...newMenu];
  const updatedVendor = updateProperty(id, "menu", payload );
  return updatedVendor;
}


export {
  createVendor,
  findAllVendors,
  findVendorByName,
  findVendorByUid,
  findVendorById, 
  findVendorByMenuItemId,
  updateProperty,
  updateMenu,
};
