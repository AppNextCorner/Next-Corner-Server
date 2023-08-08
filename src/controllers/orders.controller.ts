import { NextFunction, Response, Request } from "express";
import * as helpers from "../helpers/modelHelpers/orders/orders.helper";
import * as userHelper from "../helpers/modelHelpers/user.helper";
import { userInterface } from "../interfaces/user.interface";

const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    console.log(data);
    const placedOrder = await helpers.createOrder(data);
    console.log(placedOrder);
    res.status(200).send({
      placedOrder,
    });
  } catch (err) {
    console.log(err);
  }
};

// TODO:
// Get orders by name of the store and status of the order and get the uid here
const getOrdersById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Response is Iorder[]
  const response: any = await helpers.findOrdersByProperty(
    "orders.storeId",
    req.params.id
  );
  res.status(200).send({
    orders: response,
  });
};

// Ths is for the user's past order
const getOrdersByUid = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const response: any = await helpers.findOrdersByProperty(
    "uid",
    req.params.uid
  );

  const user: userInterface | null = await userHelper.findById(req.params.uid);
  res.status(200).send({
    userOrders: response,
    user,
  });
};

const updateAcceptedStatus = async (
  req: any,
  res: Response,
  _next: NextFunction
) => {
  try {
    const data = req.body;
    if (data.newStatus === "accepted") {
      const updatedOrder = await helpers.updateOrderProperty(
        data.orderId,
        "accepted",
        data.newStatus
      );
      res.status(200).send({
        updated: updatedOrder,
      });
    } else {
      await helpers.deleteOrderById(data.orderId);
      res.status(200).send({
        payload: data.orderId,
        message: "Rejected Order",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateStatus = async (req: any, res: Response, _next: NextFunction) => {
  try {
    const data = req.body;
    if (data.newStatus === "complete") {
      const updatedOrder = await helpers.updateOrderProperty(
        data.orderId,
        "status",
        data.newStatus
      );

      res.status(200).send({
        updated: updatedOrder,
      });
    } else {
      res.status(200).send({
        payload: data.orderId,
        message: "Rejected Status",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
export { postOrder, getOrdersById, getOrdersByUid, updateAcceptedStatus, updateStatus};
