import { NextFunction, Response } from "express";
import {
  findVendorByName,
  createVendor,
} from "../helpers/modelHelpers/businessModelHelpers/business.helper";
import { removeFile } from "../helpers/remove";
import { cloudinary } from "../helpers/cloudinary";
import { IBusiness } from "../interfaces/store.interface";

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

const uploadStore = async (req: any, res: Response, next: NextFunction) => {
  try {
    const storeData = JSON.parse(req.body.payload);
    console.log(storeData)
    console.log("file: ",req.file)
    // Replace the previous file with the new one uploaded from the user
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${req.file.path}_banner`,
      width: 500,
      height: 500,
      crop: "fill",
      folder: 'NextCornerApp'
    });
    console.log('result: ', result)

    const data: IBusiness = {
      name: storeData.name,
      image: result.url,
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

    let createdVendor: IBusiness | null = null;

    try {
      const business: IBusiness = await createVendor(data);
      createdVendor = business;

    } catch (error) {
      console.error(error);
    }
    console.log(createdVendor);
    // After uploading to cloudinary 
    removeFile(req.file.path); // Remove the file from storage to prevent overflow
    res.status(201).send({
      newStore: createdVendor,
      message: "New store created successfully"
    })
  } catch (err) {
    res.status(401).send({
      message: "Missing: " + err
    })
    next(err);
  }
};

export { createCard, getVendorByName, uploadStore };
