import { NextFunction, Response, Request } from "express";
import {
  findVendorByName,
  findVendorByUid,
  findVendorById,
  createVendor,
  updateProperty,
  updateMenu,
  updateMenuItem,
  uploadMenu,
} from "../helpers/modelHelpers/businessModelHelpers/business.helper";
import { extractPublicId } from "cloudinary-build-url";
import { removeFile } from "../helpers/remove";
import { cloudinary } from "../helpers/cloudinary";
import { IBusiness } from "../interfaces/store.interface";
import { checkForRequiredFields } from "../helpers/ErrorHelpers/invalidFields.helper";
import { Iitem } from "../interfaces/item.interface";
import ItemService from "../helpers/modelHelpers/businessModelHelpers/item.service";
import { Document, Types } from "mongoose";
const itemHelper = new ItemService();
const createCard = async (
  req: any,
  res: Response,
  Model: any,
  savedData: any
) => {
  const auth = req.currentUser;
  if (auth) {
    try {
      const card = new Model();

      const saved = await card.save(savedData);

      return res.status(201).json(saved);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(403).send("Not authorized");
  }
};

/**
 * This function returns vender data (In vendor interface type) when given a name
 *
 * businessName is string
 *
 * @param req Incoming Request
 * @param res Sent Response
 * @param next Next Function
 * @returns
 */
const getVendorByName = async (req: any, res: Response, next: NextFunction) => {
  try {
    const payload = await findVendorByName(req.businessName); // use the helper functions
    return res.status(200).send({
      payload: payload[0], // return the vendor data
      message: "Vender Info Sent!", // return the message
    });
  } catch (err) {
    next(err);
  }
};

const getVendorByuid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.params.uid;
    const stores = await findVendorByUid(uid);
    res.status(200).send({
      stores,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const uploadStore = async (req: any, res: Response, next: NextFunction) => {
  try {
    const storeData = JSON.parse(req.body.payload);
    // Replace the previous file with the new one uploaded from the user

    const data: IBusiness = {
      name: storeData.name,
      image: storeData.image,
      announcements: storeData.announcements,
      location: storeData.location,
      times: storeData.times,
      itemCategories: storeData.itemCategories,
      category: storeData.category,
      menu: storeData.menu,
      uid: storeData.uid,
      rating: storeData.rating,
      trending: storeData.trending,
      storeStatus: storeData.storeStatus,
      status: storeData.status,
    };
    const business: IBusiness = await createVendor(data);

    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${req.file.path}_banner`,
      width: 500,
      height: 500,
      crop: "fill",
      folder: "NextCornerApp",
    });

    const updatedBusiness = await updateProperty(
      business._id?.toString(),
      "image",
      result.url
    );

    // After uploading to cloudinary
    removeFile(req.file.path); // Remove the file from storage to prevent overflow
    res.status(201).send({
      newStore: updatedBusiness,
      message: "New store created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
    next(err);
  }
};

const updateItem = async (req: any, res: Response, next: NextFunction) => {
  // Getting the item from the request -> sent as an array
  const incomingData = JSON.parse(req.body.payload)!;
  let updatedItem: Iitem[] = incomingData.newMenu;
  const prevItem: Iitem[] = await itemHelper.findItemById(updatedItem[0]._id!);
  try {

    // remove old image
    const publicId = extractPublicId(prevItem[0].image!);
    if (publicId) {
      await cloudinary.uploader.destroy(
        publicId + ".png_banner",
        function (error: any, _result: any) {
          if (error) {
            return res
              .status(500)
              .send("Image deletion failed. Please try again later."); // Return error response to the client
          }
        }
      );
    }

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${req.file.path}_banner`,
      width: 500,
      height: 500,
      crop: "fill",
      folder: "NextCornerApp",
    });

    // Update the updated item with the new image
    updatedItem[0].image = result.url;

    // Place the updated item in the menu
    await updateMenuItem(updatedItem);
    removeFile(req.file.path); // Remove the file from storage to prevent overflow

    // Send a notification message to the app
    res.status(200).send({
      message: "Item updated successfully",
    });
  } catch (err: any) {
    res.status(400).send(err);
    next(err);
  }
};

// TODO: use updateMenuitem function instead of updateMenu itself to add an item
const uploadItems = async (req: any, res: Response, next: NextFunction) => {
  try {
    console.log("here is req.body: ", req.body);
    const data = JSON.parse(req.body.payload);
    const incomingData = data;
    const storeId = incomingData.store.id;
    const incomingItem: Iitem[] = incomingData.newMenu;
    // console.log('incoming data: ', incomingData)
    // Check if the fields are valid before uploading to model
    // const requiredFields = ["name", "time", "price", "image", "storeInfo"];
    // const isAllFieldsPresent = checkForRequiredFields(
    //   requiredFields,
    //   incomingItem[0]
    // );
    // removeFile(req.file.path); // Remove the file from storage to prevent overflow
    // if (isAllFieldsPresent != null) {
    //   res.status(400).json({ payload: isAllFieldsPresent });
    //   return;
    // }
    await uploadMenu(storeId, incomingItem, true);

    // // upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${req.file.path}_banner`,
      width: 500,
      height: 500,
      crop: "fill",
      folder: "NextCornerApp",
    });
    incomingItem[0].image = result.url;

    const updatedStore = await uploadMenu(storeId, incomingItem, false);

    // After uploading to cloudinary
    removeFile(req.file.path); // Remove the file from storage to prevent overflow
    res.status(200).send({
      updatedStore,
    });
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const getItemById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = req.params;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const deleteItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    console.log('data in delete: ', data)
    const vendorId = data.vendorId;
    const itemId = data.itemId;
    const vendor = await findVendorById(vendorId);
    console.log('item: ', itemId, vendor)
    if (vendor) {
      console.log('deleting item: ', itemId)
      const isItem = (element: any) => element.id == itemId;

      // Delete the image from cloudinary first
      const findItem = vendor.menu.findIndex(isItem);
      const publicId = extractPublicId(vendor.menu[findItem].image!);

      await cloudinary.uploader.destroy(
        publicId + ".png_banner",
        function (error: any, result: any) {
          if (error) {
            return res
              .status(500)
              .send("Image deletion failed. Please try again later."); // Return error response to the client
          }
        }
      );

      // Delete the menu item after deleting the image from the cloud service
      const newMenu = await Promise.all(
        vendor.menu.filter((currentItem: Iitem) => currentItem.id !== itemId)
      );

      const newVendor = await updateProperty(vendorId, "menu", newMenu);
      res.status(200).send({
        newVendor,
        message: "Menu updated successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

export {
  createCard,
  deleteItemById,
  getItemById,
  getVendorByName,
  getVendorByuid,
  uploadStore,
  uploadItems,
  updateItem
};
