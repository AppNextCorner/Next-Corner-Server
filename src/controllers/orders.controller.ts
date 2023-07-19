import { NextFunction, Response, Request } from "express";
import { findOrdersByProperty } from "../helpers/modelHelpers/orders/orders.helper";
import * as userHelper from "../helpers/modelHelpers/user.helper";
import { userInterface } from "../interfaces/user.interface";

// Get orders by name of the store and status of the order and get the uid here
const getOrdersByStoreName = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Response is Iorder[]
  const response: any = await findOrdersByProperty("orders.storeName", req.params.name, );
  console.log(response)
//   const user: userInterface | null = await userHelper.findById(
//     response[0]._id
//   );
};

// Ths is for the user's past order
const getOrdersByUid = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const response: any = await findOrdersByProperty("uid", req.params.uid);
  const user: userInterface | null = await userHelper.findById(response[0].uid);
  console.log("USER: ", user);
};
export { getOrdersByStoreName, getOrdersByUid };
