import { itemModel } from "../../../models/businessModel";

const model = itemModel;

/**
 * This function returns all items
 * @param selections Any selections
 * @returns
 */
const findAllItems = async (selections: any = {}) => {
  const data = await model.find().select(selections).exec();
  return await model.find().select(selections);
};
export { findAllItems };
