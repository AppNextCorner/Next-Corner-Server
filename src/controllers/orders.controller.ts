import { NextFunction, Response, Request } from "express";
import * as helpers from "../helpers/modelHelpers/orders/orders.helper";
import * as userHelper from "../helpers/modelHelpers/user.helper";
import { userInterface } from "../interfaces/user.interface";

const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const data = req.body;
    console.log(data);
    const placedOrder = await helpers.createOrder(data);
    console.log(placedOrder)
    res.status(200).send({
      placedOrder,
    })  
  }catch(err){
    console.log(err);
  }
};
// TODO: 
// Get orders by name of the store and status of the order and get the uid here
const getOrdersByStoreName = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Response is Iorder[]
  const response: any = await helpers.findOrdersByProperty(
    "orders.storeName",
    req.params.name
  );
  console.log(response);
  //   const user: userInterface | null = await userHelper.findById(
  //     response[0]._id
  //   );
};

// Ths is for the user's past order
const getOrdersByUid = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const response: any = await helpers.findOrdersByProperty("uid", req.params.uid);
  
  const user: userInterface | null = await userHelper.findById(req.params.uid);
  res.status(200).send({
    userOrders: response,
    user,
  })
};
export { postOrder, getOrdersByStoreName, getOrdersByUid };
