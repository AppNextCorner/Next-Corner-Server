"use strict";
/**
 * Note: Each card when editing should include a save option with updates the card when detecting new changes in frontend input
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { Request, Response } = require("express");
const express = require("express");
const businessRouter = express.Router();
const upload = require("../helpers/multer");
const { createCard } = require("../controllers/business");
const { imageHelper } = require("../helpers/uploadImages");
const { vendorModel, announcementModel, itemModel, categoryModel, optionLabelModel, optionModel, } = require("../models/businessModel");
const firebase = require("../util/firebase.util");
function decodeIDToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Token Request", req.token);
        if (req.token) {
            try {
                const decodedToken = yield firebase.verifyToken(req.token);
                req["currentUser"] = decodedToken;
                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
const uploadAny = upload.any();
businessRouter.patch("/upload-announcement-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    imageHelper(res, req, announcementModel);
}));
businessRouter.patch("/upload-vendor-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    imageHelper(res, req, vendorModel);
}));
businessRouter.patch("/upload-item-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    imageHelper(res, req, itemModel);
}));
businessRouter.patch("/upload-category-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    imageHelper(res, req, categoryModel);
}));
businessRouter.patch("/upload-option-label-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    imageHelper(res, req, optionLabelModel);
}));
businessRouter.patch("/upload-option-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    imageHelper(res, req, optionModel);
}));
businessRouter.post("/upload-vendor-card", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
businessRouter.post("/create-category", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    createCard(req, res, categoryModel, {
        category: req.body.category,
    });
}));
businessRouter.post("/create-announcement", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    createCard(req, res, announcementModel, {
        color: req.body.color,
        header: req.body.header,
        description: req.body.description,
        image: req.body.image || null,
    });
}));
businessRouter.post("/create-option-label", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    createCard(req, res, optionLabelModel, {
        label: req.body.label,
        selected: req.body.selected,
        optionId: req.body.optionId,
    });
}));
businessRouter.post("/create-option", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    createCard(req, res, optionModel, {
        name: req.body.name,
        type: req.body.type,
        optionCustomizations: req.body.optionCustomizations,
    });
}));
businessRouter.post("/create-item", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
businessRouter.get("/get-vendors", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
        const vendors = yield vendorModel.find({});
        console.log("vendors", vendors);
        return res.json(vendors.map((vendor) => vendor.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-announcements", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
        const announcements = yield announcementModel.find({});
        console.log("announcements", announcements);
        return res.json(announcements.map((announcement) => announcement.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-items", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
        const items = yield itemModel.find({});
        console.log("items", items);
        return res.json(items.map((item) => item.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-categories", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
        const categories = yield categoryModel.find({});
        console.log("categories", categories);
        return res.json(categories.map((category) => category.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-option-labels", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
        const optionLabels = yield optionLabelModel.find({});
        console.log("optionLabels", optionLabels);
        return res.json(optionLabels.map((optionLabel) => optionLabel.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-options", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    console.log("Auth: ", req.currentUser);
    if (auth) {
        const options = yield optionModel.find({});
        console.log("options", options);
        return res.json(options.map((option) => option.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.patch("/update-vendor/:id", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    const updatedVendor = req.body;
    try {
        const vendor = yield vendorModel.findByIdAndUpdate(vendorId, updatedVendor, { new: true });
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        return res.json(vendor.toJSON());
    }
    catch (error) {
        console.error("Error updating vendor:", error);
        return res.status(500).json({ error: "Failed to update vendor" });
    }
}));
businessRouter.patch("/update-announcement/:id", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const announcementId = req.params.id;
    const updatedAnnouncement = req.body;
    try {
        const announcement = yield announcementModel.findByIdAndUpdate(announcementId, updatedAnnouncement, { new: true });
        if (!announcement) {
            return res.status(404).json({ error: "Announcement not found" });
        }
        return res.json(announcement.toJSON());
    }
    catch (error) {
        console.error("Error updating announcement:", error);
        return res.status(500).json({ error: "Failed to update announcement" });
    }
}));
businessRouter.patch("/update-item/:id", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    const updatedItem = req.body;
    try {
        const item = yield itemModel.findByIdAndUpdate(itemId, updatedItem, {
            new: true,
        });
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        return res.json(item.toJSON());
    }
    catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({ error: "Failed to update item" });
    }
}));
module.exports = businessRouter;
