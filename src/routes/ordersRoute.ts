require("dotenv").config();
import express from "express";
const orderRouter = express.Router();
import { Request, Response, NextFunction } from "express";
// const decodeIDToken = require('../authenticateToken')
import Orders from "../models/orderModel";
import { verifyToken } from "../util/firebase.util";
import { getOrdersByStoreName } from "../controllers/orders.controller";

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

orderRouter.post("/", decodeIDToken, async (req: any, res: Response) => {
  const auth = req.currentUser;
  // console.log("current user: ", req.currentUser);
  if (auth) {
    try {
      const order = new Orders(req.body);
      const saveOrder = await order.save();
      // console.log(saveOrder);
      return res.status(201).json(saveOrder);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(403).send("Not authorized");
  }
});

orderRouter.get(
  "/get-orders-by-store-name/:name",
  decodeIDToken,
  async (req: any, res: Response, next: NextFunction) => {
    const auth = req.currentUser;
    if (auth) {
      getOrdersByStoreName(req, res, next);
    }
  }
);

orderRouter.get(
  "/get-orders-by-uid/:uid",
  decodeIDToken,
  async (req: any, res: Response, next: NextFunction) => {
    const auth = req.currentUser;
    if (auth) {
      getOrdersByStoreName(req, res, next);
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
