import Σ from "./summation.math";

const average = async (arr: number[], listLength: number) => {
  const sum = await Σ(arr);
  return sum / listLength;
};

export default average;
