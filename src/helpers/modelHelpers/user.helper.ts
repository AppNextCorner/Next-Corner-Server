import { userModel } from "../../models/userModel";

const model = userModel;

const findById = async (id: string, selections: any = {}) => {
  return await model.findById(id).select(selections).exec();
};

const findByEmail = async (email: string, selections: any = {}) => {
  return await model.findOne({ email: email }).select(selections).exec();
};

export { findById, findByEmail };
