import { NextFunction, Response, Request } from "express";
import {
  findVendorByName,
  findVendorByUid, 
  createVendor,
  updateProperty,
  updateMenu,
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

const getVendorByuid = async( req: Request, res: Response, next: NextFunction ) => {
  try{
    const uid = req.params.uid;
    const stores = await findVendorByUid(uid);
    res.status(200).send({
      stores,
    })

  } catch(err) {
    console.log(err);
    next(err);
  }
}

const uploadStore = async (req: any, res: Response, next: NextFunction) => {
  try {
    const storeData = JSON.parse(req.body.payload);
    console.log(storeData)
    console.log("file: ",req.file)
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
      folder: 'NextCornerApp'
    });

    const updatedBusiness = await updateProperty(business._id?.toString(), 'image', result.url)

    // After uploading to cloudinary 
    removeFile(req.file.path); // Remove the file from storage to prevent overflow
    res.status(201).send({
      newStore: updatedBusiness,
      message: "New store created successfully"
    })
  } catch (err) {
    console.log('error: ', err)
    res.status(401).send({
      message: "Missing: " + err
    })
    next(err);
  }
};

const uploadItems = async(req: any, res: Response, next: NextFunction) => {
  try{
    const data = req.body;
    const incomingData = JSON.parse(data.payload);
    const vendorId = incomingData.store.id;
    const incomingItem = incomingData.newMenu;
    const updatedStore = await updateMenu(vendorId, incomingItem)
    console.log(updatedStore);
    // res.status(200).send(
    //   updatedStore,
    // );
  } catch(err){
    next(err);
  }

};


export { createCard, getVendorByName, getVendorByuid, uploadStore, uploadItems };
