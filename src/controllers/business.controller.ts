import { Response } from "express";

const createCard = async (
  req: any,
  res: Response,
  Model: any,
  savedData: any
) => {
  const auth = req.currentUser;
  if (auth) {
    try {
      const card = new Model();

      const saved = await card.save(savedData);

      return res.status(201).json(saved);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(403).send("Not authorized");
  }
};

export { createCard };
