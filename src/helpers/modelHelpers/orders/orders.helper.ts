import orderModel from "../../../models/orderModel";

const model = orderModel;

const findOrdersByProperty = async (property: string, select: any, selections: any = {}) => {
  return await model.find({ [property]: select }).select(selections).exec();
};

export { findOrdersByProperty };
