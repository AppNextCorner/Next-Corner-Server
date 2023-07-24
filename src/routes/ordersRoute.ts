require("dotenv").config();
import express from "express";
const orderRouter = express.Router();
import { Request, Response, NextFunction } from "express";
// const decodeIDToken = require('../authenticateToken')
import Orders from "../models/orderModel";
import { verifyToken } from "../util/firebase.util";
import * as controller from "../controllers/orders.controller";

async function decodeIDToken(req: any, _res: Response, next: NextFunction) {
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

orderRouter.post(
  "/place-order",
  decodeIDToken,
  async (req: any, res: Response, next: NextFunction) => {
    const auth = req.currentUser;
    if (auth) {
      controller.postOrder(req, res, next);
    }
  }
);

orderRouter.put(
  "/update-accept-status",
  decodeIDToken,
  async (req: any, res: Response, next: NextFunction) => {
    const auth = req.currentUser;
    if (auth) {
      controller.updateAcceptedStatus(req, res, next);
    }
  }
);

orderRouter.get(
  "/get-orders-by-store-name/:name/",
  decodeIDToken,
  async (req: any, res: Response, next: NextFunction) => {
    const auth = req.currentUser;
    if (auth) {
      controller.getOrdersByStoreName(req, res, next);
    }
  }
);

orderRouter.get(
  "/get-orders-by-uid/:uid/",
  decodeIDToken,
  async (req: any, res: Response, next: NextFunction) => {
    const auth = req.currentUser;
    if (auth) {
      controller.getOrdersByUid(req, res, next);
    }
  }
);

orderRouter.patch("/order-status/:id", (req: any, res: Response) => {
  // grab the new score info
  const data = req.body;
  const auth = req.currentUser;

  // create a new score in the database
  async function updateStatus() {
    try {
      const newStatus = await Orders.findOneAndUpdate(
        { _id: req.params.id },
        {
          orderStatus: data.status,
        }
      );
      // grab _id from body -> then add what data to update
      return res.status(201).send(newStatus);
    } catch (err: any) {
      res.status(403).send(err.message);
    }
  }
  updateStatus();
});
export default orderRouter;
