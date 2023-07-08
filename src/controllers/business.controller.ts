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

const uploadStore = async (req: any, _res: Response, next: NextFunction) => {
  try {
    const storeData = JSON.parse(req.body.payload);

    // Replace the previous file with the new one uploaded from the user
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   public_id: `${req.file.path}_banner`,
    //   width: 500,
    //   height: 500,
    //   crop: "fill",
    // });

    const data: IBusiness = {
      name: storeData.name,
      image: storeData.image,
      announcements: storeData.announcements,
      location: storeData.location,
      times: storeData.times,
      categories: [storeData.category.name],
      menu: storeData.menu,
      uid: storeData.uid,
      categoryId: storeData.category.id,
      rating: storeData.rating,
      trending: storeData.trending,
      storeStatus: storeData.storeStatus,
      status: storeData.status,
    };

    createVendor(data);

    // removeFile(req.file.path); // Remove the file from storage to prevent overflow
    // res.status(201).send({})
  } catch (err) {
    next(err);
  }
};

export { createCard, getVendorByName, uploadStore };
