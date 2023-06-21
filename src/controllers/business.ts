const { Request, Response } = require("express");
const { vendorModel, announcementModel } = require("../models/businessModel");

const createCard = async (req: typeof Request, res: typeof Response, Model: any, savedData: any) => {
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

export {};
module.exports = {
  createCard,
};
