import { Iorder } from "../../../interfaces/order.interface";
import orderModel from "../../../models/orderModel";

const model = orderModel;

const deleteOrderById = async (orderId: string) => {
  return await model.findByIdAndDelete(orderId).exec();
};

// Add comments
const findOrdersByProperty = async (
  property: string,
  select: any,
  selections: any = {}
) => {
  return await model
    .find({ [property]: select })
    .select(selections)
    .exec();
};

// add comments
const updateOrderProperty = async (
  orderId: string,
  property: string,
  newValue: any
) => {
  return await model.findByIdAndUpdate(
    orderId,
    {
      [property]: newValue,
    },
    {
      new: true,
    }
  );
};

// add comments
const createOrder = async (order: Iorder) => {
  return await model.create({
    orders: order.orders,
    storeInfo: order.storeInfo,
    minutesToDone: order.minutesToDone,
    status: order.status,
    accepted: order.accepted,
    uid: order.uid,
  });
};

export {
  createOrder,
  findOrdersByProperty,
  updateOrderProperty,
  deleteOrderById,
};
