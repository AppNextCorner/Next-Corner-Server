/**
 * Note: Each card when editing should include a save option with updates the card when detecting new changes in frontend input
 */

require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import express from "express";
const businessRouter = express.Router();
import { upload } from "../helpers/multer";
import {
  getVendorByName,
  getVendorByuid,
  uploadStore,
  uploadItems,
  deleteItemById,
} from "../controllers/business.controller";
import { imageHelper } from "../helpers/uploadImages";
import {
  vendorModel,
} from "../models/businessModel";
import { verifyToken } from "../util/firebase.util";

async function decodeIDToken(req: any, res: any, next: any) {
  console.log("Token Request", req.token);
  if (req.token) {
    try {
      const decodedToken = await verifyToken(req.token);
      req["currentUser"] = decodedToken;
      next();
    } catch (err) {
      console.log(err);
    }
  }
}
businessRouter.get(
  "/get-vendors",
  decodeIDToken,
  async (req: any, res: Response) => {
    const auth = req.currentUser;
    if (auth) {
      const vendors = await vendorModel.find({});
      // console.log("vendors", vendors);
      return res.json(vendors.map((vendor: any) => vendor.toJSON()));
    } else {
      return res.status(403).send("Not authorized");
    }
  }
);

businessRouter.post(
  "/getVendorByName",
  decodeIDToken,
  async (req: any, res: Response, next: NextFunction) => {
    const auth = req.currentUser;
    if (auth) {
      getVendorByName(req.body, res, next);
    }
  }
);

businessRouter.get("/get-stores-by-uid/:uid", decodeIDToken, async(req: Request, res: Response, next: NextFunction) => {
  getVendorByuid(req, res, next)
})

businessRouter.post("/createStore", upload.single('image'), async(req: any, res: Response, next: NextFunction) => {
  uploadStore(req, res, next);
})


businessRouter.put("/updateMenu", upload.single('image'), async(req: any, res: Response, next: NextFunction) => {
  uploadItems(req,res,next);
})

businessRouter.put("/items/deleteItem", decodeIDToken, async(req: any, res:Response, next: NextFunction) => {
  deleteItemById(req, res, next);
})

export default businessRouter;
