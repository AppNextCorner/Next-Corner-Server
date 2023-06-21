/**
 * Note: Each card when editing should include a save option with updates the card when detecting new changes in frontend input
 */

require("dotenv").config();
const { Request, Response } = require("express");
const express = require("express");
const businessRouter = express.Router();

const decodeIDToken = require("../helpers/auth");
const upload = require("../helpers/multer");
const { createCard } = require("../controllers/business");
const { imageHelper } = require("../helpers/uploadImages");
const {
  vendorModel,
  announcementModel,
  itemModel,
  categoryModel,
  optionLabelModel,
  optionModel,
} = require("../models/businessModel");

const uploadAny = upload.any();

businessRouter.patch(
  "/upload-announcement-image",
  decodeIDToken,
  uploadAny,
  async (req: typeof Request, res: typeof Response) => {
    imageHelper(res, req, announcementModel);
  }
);

businessRouter.patch(
  "/upload-vendor-image",
  decodeIDToken,
  uploadAny,
  async (req: typeof Request, res: typeof Response) => {
    imageHelper(res, req, vendorModel);
  }
);

businessRouter.patch(
  "/upload-item-image",
  decodeIDToken,
  uploadAny,
  async (req: typeof Request, res: typeof Response) => {
    imageHelper(res, req, itemModel);
  }
);

businessRouter.patch(
  "/upload-category-image",
  decodeIDToken,
  uploadAny,
  async (req: typeof Request, res: typeof Response) => {
    imageHelper(res, req, categoryModel);
  }
);

businessRouter.patch(
  "/upload-option-label-image",
  decodeIDToken,
  uploadAny,
  async (req: typeof Request, res: typeof Response) => {
    imageHelper(res, req, optionLabelModel);
  }
);

businessRouter.patch(
  "/upload-option-image",
  decodeIDToken,
  uploadAny,
  async (req: typeof Request, res: typeof Response) => {
    imageHelper(res, req, optionModel);
  }
);

businessRouter.post(
  "/upload-vendor-card",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    createCard(req, res, vendorModel, {
      name: req.body.name,
      image: null,
      announcements: req.body.announcements,
      location: req.body.location,
      open: req.body.open,
      close: req.body.close,
      categories: req.body.categories,
      menu: req.body.menu,
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      rating: req.body.rating,
      trending: req.body.trending,
    });
  }
);

businessRouter.post(
  "/create-category",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    createCard(req, res, categoryModel, {
      category: req.body.category,
    });
  }
);

businessRouter.post(
  "/create-announcement",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    createCard(req, res, announcementModel, {
      color: req.body.color,
      header: req.body.header,
      description: req.body.description,
      image: req.body.image || null,
    });
  }
);

businessRouter.post(
  "/create-option-label",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    createCard(req, res, optionLabelModel, {
      label: req.body.label,
      selected: req.body.selected,
      optionId: req.body.optionId,
    });
  }
);

businessRouter.post(
  "/create-option",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    createCard(req, res, optionModel, {
      name: req.body.name,
      type: req.body.type,
      optionCustomizations: req.body.optionCustomizations,
    });
  }
);

businessRouter.post(
  "/create-item",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    createCard(req, res, itemModel, {
      name: req.body.name,
      time: req.body.time,
      image: req.body.image || null,
      price: req.body.price,
      description: req.body.description,
      customizations: req.body.customizations,
      category: req.body.category,
      featured: req.body.featured,
      amountInCart: req.body.amountInCart,
      rating: req.body.rating,
    });
  }
);

businessRouter.get(
  "/get-vendors",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
      const vendors = await vendorModel.find({});
      console.log("vendors", vendors);
      return res.json(vendors.map((vendor: any) => vendor.toJSON()));
    } else {
      return res.status(403).send("Not authorized");
    }
  }
);

businessRouter.get(
  "/get-announcements",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
      const announcements = await announcementModel.find({});
      console.log("announcements", announcements);
      return res.json(
        announcements.map((announcement: any) => announcement.toJSON())
      );
    } else {
      return res.status(403).send("Not authorized");
    }
  }
);

businessRouter.get(
  "/get-items",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
      const items = await itemModel.find({});
      console.log("items", items);
      return res.json(items.map((item: any) => item.toJSON()));
    } else {
      return res.status(403).send("Not authorized");
    }
  }
);

businessRouter.get(
  "/get-categories",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
      const categories = await categoryModel.find({});
      console.log("categories", categories);
      return res.json(categories.map((category: any) => category.toJSON()));
    } else {
      return res.status(403).send("Not authorized");
    }
  }
);

businessRouter.get(
  "/get-option-labels",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
      const optionLabels = await optionLabelModel.find({});
      console.log("optionLabels", optionLabels);
      return res.json(
        optionLabels.map((optionLabel: any) => optionLabel.toJSON())
      );
    } else {
      return res.status(403).send("Not authorized");
    }
  }
);

businessRouter.get(
  "/get-options",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
      const options = await optionModel.find({});
      console.log("options", options);
      return res.json(options.map((option: any) => option.toJSON()));
    } else {
      return res.status(403).send("Not authorized");
    }
  }
);

businessRouter.patch(
  "/update-vendor/:id",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const vendorId = req.params.id;
    const updatedVendor = req.body;

    try {
      const vendor = await vendorModel.findByIdAndUpdate(
        vendorId,
        updatedVendor,
        { new: true }
      );
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }
      return res.json(vendor.toJSON());
    } catch (error) {
      console.error("Error updating vendor:", error);
      return res.status(500).json({ error: "Failed to update vendor" });
    }
  }
);

businessRouter.patch(
  "/update-announcement/:id",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const announcementId = req.params.id;
    const updatedAnnouncement = req.body;

    try {
      const announcement = await announcementModel.findByIdAndUpdate(
        announcementId,
        updatedAnnouncement,
        { new: true }
      );
      if (!announcement) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      return res.json(announcement.toJSON());
    } catch (error) {
      console.error("Error updating announcement:", error);
      return res.status(500).json({ error: "Failed to update announcement" });
    }
  }
);

businessRouter.patch(
  "/update-item/:id",
  decodeIDToken,
  async (req: typeof Request, res: typeof Response) => {
    const itemId = req.params.id;
    const updatedItem = req.body;

    try {
      const item = await itemModel.findByIdAndUpdate(itemId, updatedItem, {
        new: true,
      });
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      return res.json(item.toJSON());
    } catch (error) {
      console.error("Error updating item:", error);
      return res.status(500).json({ error: "Failed to update item" });
    }
  }
);

export {};
module.exports = businessRouter;
