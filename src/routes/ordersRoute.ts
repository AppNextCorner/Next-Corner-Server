require("dotenv").config();
import express from "express";
const orderRouter = express.Router();
import { Request, Response, NextFunction } from "express";
// const decodeIDToken = require('../authenticateToken')
import Orders from "../models/orderModel";
import { verifyToken } from "../util/firebase.util";

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

orderRouter.get("/", decodeIDToken, async (req: any, res: Response) => {
  const auth = req.currentUser;
  //console.log("Auth: ", req)
  if (auth) {
    const orders = await Orders.find({});
    // console.log(orders);
    return res.json(orders.map((order: any) => order.toJSON()));
  } else {
    return res.status(403).send("Not authorized");
  }
});
orderRouter.patch("/order-status/:id", (req: any, res: Response) => {
  // grab the new score info
  const data = req.body;
  const auth = req.currentUser;
  //const id = parseInt(req.query.id)
  //const mapScore = Cart.map(val => val.cartData)

  // create a new score in the database
  async function updateStatus() {
    try {
      // console.log(req.currentUser);
      // console.log(req.params.id);
      // console.log(req.body);

      const newStatus = await Orders.findOneAndUpdate(
        { _id: req.params.id },
        {
          orderStatus: data.status,
        }
      );
      // console.log(newStatus);
      // grab _id from body -> then add what data to update
      return res.status(201).send(newStatus);
    } catch (err: any) {
      res.status(403).send(err.message);
    }
  }
  // if (auth) {
  updateStatus();
  // } else {
  //   return res.status(403).send('Not authorized')
  // }
});
export default orderRouter;
