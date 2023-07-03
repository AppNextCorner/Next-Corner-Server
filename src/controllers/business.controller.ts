import { NextFunction, Response } from "express";
import { findVendorByName } from "../helpers/modelHelpers/businessModelHelpers/business.helper";
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

export { createCard, getVendorByName };
