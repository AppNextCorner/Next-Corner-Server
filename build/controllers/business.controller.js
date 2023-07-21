"use strict";
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
exports.uploadItems = exports.uploadStore = exports.getVendorByuid = exports.getVendorByName = exports.deleteItemById = exports.createCard = void 0;
const business_helper_1 = require("../helpers/modelHelpers/businessModelHelpers/business.helper");
const cloudinary_build_url_1 = require("cloudinary-build-url");
const remove_1 = require("../helpers/remove");
const cloudinary_1 = require("../helpers/cloudinary");
const invalidFields_helper_1 = require("../helpers/ErrorHelpers/invalidFields.helper");
const createCard = (req, res, Model, savedData) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        try {
            const card = new Model();
            const saved = yield card.save(savedData);
            return res.status(201).json(saved);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(403).send("Not authorized");
    }
});
exports.createCard = createCard;
/**
 * This function returns vender data (In vendor interface type) when given a name
 *
 * businessName is string
 *
 * @param req Incoming Request
 * @param res Sent Response
 * @param next Next Function
 * @returns
 */
const getVendorByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield (0, business_helper_1.findVendorByName)(req.businessName); // use the helper functions
        return res.status(200).send({
            payload: payload[0],
            message: "Vender Info Sent!", // return the message
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getVendorByName = getVendorByName;
const getVendorByuid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.uid;
        const stores = yield (0, business_helper_1.findVendorByUid)(uid);
        res.status(200).send({
            stores,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getVendorByuid = getVendorByuid;
const uploadStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const storeData = JSON.parse(req.body.payload);
        // Replace the previous file with the new one uploaded from the user
        const data = {
            name: storeData.name,
            image: storeData.image,
            announcements: storeData.announcements,
            location: storeData.location,
            times: storeData.times,
            itemCategories: storeData.itemCategories,
            category: storeData.category,
            menu: storeData.menu,
            uid: storeData.uid,
            rating: storeData.rating,
            trending: storeData.trending,
            storeStatus: storeData.storeStatus,
            status: storeData.status,
        };
        console.log('store data', data);
        const business = yield (0, business_helper_1.createVendor)(data);
        const result = yield cloudinary_1.cloudinary.uploader.upload(req.file.path, {
            public_id: `${req.file.path}_banner`,
            width: 500,
            height: 500,
            crop: "fill",
            folder: "NextCornerApp",
        });
        const updatedBusiness = yield (0, business_helper_1.updateProperty)((_a = business._id) === null || _a === void 0 ? void 0 : _a.toString(), "image", result.url);
        // After uploading to cloudinary
        (0, remove_1.removeFile)(req.file.path); // Remove the file from storage to prevent overflow
        res.status(201).send({
            newStore: updatedBusiness,
            message: "New store created successfully",
        });
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err);
        next(err);
    }
});
exports.uploadStore = uploadStore;
const uploadItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req body: ', JSON.parse(req.body.payload));
        const data = JSON.parse(req.body.payload);
        //console.log('data: ', JSON.parse(JSON.stringify(data)));
        //console.log(JSON.parse(data));
        const incomingData = data;
        const vendorId = incomingData.store.id;
        const incomingItem = incomingData.newMenu;
        console.log('incoming data: ', incomingData);
        // Check if the fields are valid before uploading to model
        const requiredFields = ["name", "time", "price", "image", "storeInfo"];
        const isAllFieldsPresent = (0, invalidFields_helper_1.checkForRequiredFields)(requiredFields, incomingItem[0]);
        (0, remove_1.removeFile)(req.file.path); // Remove the file from storage to prevent overflow
        if (isAllFieldsPresent != null) {
            res.status(400).json({ payload: isAllFieldsPresent });
            return;
        }
        // Test if the menu works
        yield (0, business_helper_1.updateMenu)(vendorId, incomingItem, true);
        // upload to cloudinary
        const result = yield cloudinary_1.cloudinary.uploader.upload(req.file.path, {
            public_id: `${req.file.path}_banner`,
            width: 500,
            height: 500,
            crop: "fill",
            folder: "NextCornerApp",
        });
        incomingItem[0].image = result.url;
        const updatedStore = yield (0, business_helper_1.updateMenu)(vendorId, incomingItem, false);
        // After uploading to cloudinary
        (0, remove_1.removeFile)(req.file.path); // Remove the file from storage to prevent overflow
        res.status(200).send({
            updatedStore,
        });
    }
    catch (err) {
        res.status(400).send(err);
        next(err);
    }
});
exports.uploadItems = uploadItems;
const deleteItemById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const vendorId = data.vendorId;
        const itemId = data.itemId;
        const vendor = yield (0, business_helper_1.findVendorById)(vendorId);
        if (vendor) {
            const isItem = (element) => element.id == itemId;
            // Delete the image from cloudinary first
            const findItem = vendor.menu.findIndex(isItem);
            const publicId = (0, cloudinary_build_url_1.extractPublicId)(vendor.menu[findItem].image);
            yield cloudinary_1.cloudinary.uploader.destroy(publicId + '.png_banner', function (error, result) {
                if (error) {
                    return res.status(500).send("Image deletion failed. Please try again later."); // Return error response to the client
                }
            });
            // Delete the menu item after deleting the image from the cloud service
            const newMenu = yield Promise.all(vendor.menu.filter((currentItem) => currentItem.id !== itemId));
            const newVendor = yield (0, business_helper_1.updateProperty)(vendorId, "menu", newMenu);
            res.status(200).send({
                newVendor,
                message: "Menu updated successfully"
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteItemById = deleteItemById;
