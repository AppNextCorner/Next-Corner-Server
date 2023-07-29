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
businessRouter.get("/get-vendors", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
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
    const auth = req.currentUser;
    if (auth) {
        (0, business_controller_1.getVendorByName)(req.body, res, next);
    }
}));
businessRouter.get("/get-stores-by-uid/:uid", decodeIDToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.getVendorByuid)(req, res, next);
}));
businessRouter.post("/createStore", multer_1.upload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("is running");
    (0, business_controller_1.uploadStore)(req, res, next);
}));
businessRouter.post("/updateMenu", multer_1.upload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("is running");
    (0, business_controller_1.uploadItems)(req, res, next);
}));
businessRouter.post("/update-item", multer_1.upload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.updateItem)(req, res, next);
}));
businessRouter.put("/items/deleteItem", decodeIDToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.deleteItemById)(req, res, next);
}));
businessRouter.get("/items/get-item-by-id/:itemId", decodeIDToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, business_controller_1.getItemById)(req, res, next);
}));
exports.default = businessRouter;
