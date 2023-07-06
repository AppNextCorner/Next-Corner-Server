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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const businessRouter = express_1.default.Router();
const multer_1 = require("../helpers/multer");
const business_controller_1 = require("../controllers/business.controller");
const uploadImages_1 = require("../helpers/uploadImages");
const businessModel_1 = require("../models/businessModel");
const firebase_util_1 = require("../util/firebase.util");
function decodeIDToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Token Request", req.token);
        if (req.token) {
            try {
                const decodedToken = yield (0, firebase_util_1.verifyToken)(req.token);
                req["currentUser"] = decodedToken;
                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
const uploadAny = multer_1.upload.any();
businessRouter.patch("/upload-announcement-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, uploadImages_1.imageHelper)(res, req, businessModel_1.announcementModel);
}));
businessRouter.patch("/upload-vendor-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, uploadImages_1.imageHelper)(res, req, businessModel_1.vendorModel);
}));
businessRouter.patch("/upload-item-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, uploadImages_1.imageHelper)(res, req, businessModel_1.itemModel);
}));
businessRouter.patch("/upload-category-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, uploadImages_1.imageHelper)(res, req, businessModel_1.categoryModel);
}));
businessRouter.patch("/upload-option-label-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, uploadImages_1.imageHelper)(res, req, businessModel_1.optionLabelModel);
}));
businessRouter.patch("/upload-option-image", decodeIDToken, uploadAny, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, uploadImages_1.imageHelper)(res, req, businessModel_1.optionModel);
}));
businessRouter.post("/upload-vendor-card", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.createCard)(req, res, businessModel_1.vendorModel, {
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
    (0, business_controller_1.createCard)(req, res, businessModel_1.categoryModel, {
        category: req.body.category,
    });
}));
businessRouter.post("/create-announcement", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.createCard)(req, res, businessModel_1.announcementModel, {
        color: req.body.color,
        header: req.body.header,
        description: req.body.description,
        image: req.body.image || null,
    });
}));
businessRouter.post("/create-option-label", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.createCard)(req, res, businessModel_1.optionLabelModel, {
        label: req.body.label,
        selected: req.body.selected,
        optionId: req.body.optionId,
    });
}));
businessRouter.post("/create-option", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.createCard)(req, res, businessModel_1.optionModel, {
        name: req.body.name,
        type: req.body.type,
        optionCustomizations: req.body.optionCustomizations,
    });
}));
businessRouter.post("/create-item", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.createCard)(req, res, businessModel_1.itemModel, {
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
    // console.log("Auth2: ", req.currentUser);
    if (auth) {
        const vendors = yield businessModel_1.vendorModel.find({});
        // console.log("vendors", vendors);
        return res.json(vendors.map((vendor) => vendor.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.post("/getVendorByName", decodeIDToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const auth = req.currentUser;
    if (auth) {
        (0, business_controller_1.getVendorByName)(req.body, res, next);
    }
}));
businessRouter.get("/get-announcements", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    // console.log("Auth: ", req.currentUser);
    if (auth) {
        const announcements = yield businessModel_1.announcementModel.find({});
        return res.json(announcements.map((announcement) => announcement.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-items", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    // console.log("Auth: ", req.currentUser);
    if (auth) {
        const items = yield businessModel_1.itemModel.find({});
        return res.json(items.map((item) => item.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-categories", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    // console.log("Auth: ", req.currentUser);
    if (auth) {
        const categories = yield businessModel_1.categoryModel.find({});
        console.log("categories", categories);
        return res.json(categories.map((category) => category.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-option-labels", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        const optionLabels = yield businessModel_1.optionLabelModel.find({});
        console.log("optionLabels", optionLabels);
        return res.json(optionLabels.map((optionLabel) => optionLabel.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
businessRouter.get("/get-options", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        const options = yield businessModel_1.optionModel.find({});
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
        const vendor = yield businessModel_1.vendorModel.findByIdAndUpdate(vendorId, updatedVendor, { new: true });
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
        const announcement = yield businessModel_1.announcementModel.findByIdAndUpdate(announcementId, updatedAnnouncement, { new: true });
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
        const item = yield businessModel_1.itemModel.findByIdAndUpdate(itemId, updatedItem, {
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
exports.default = businessRouter;
