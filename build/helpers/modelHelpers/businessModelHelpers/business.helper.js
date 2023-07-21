"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateMenu = exports.updateProperty = exports.findVendorByMenuItemId = exports.findVendorById = exports.findVendorByUid = exports.findVendorByName = exports.findAllVendors = exports.createVendor = void 0;
const itemHelpers = __importStar(require("./item.helper"));
const businessModel_1 = require("../../../models/businessModel");
const model = businessModel_1.vendorModel;
const createVendor = (storeData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.create({
        name: storeData.name,
        image: storeData.image,
        announcements: storeData.announcements,
        location: storeData.location,
        times: storeData.times,
        category: storeData.category,
        menu: storeData.menu,
        uid: storeData.uid,
        rating: storeData.rating,
        trending: storeData.trending,
        storeStatus: storeData.storeStatus,
        status: storeData.status,
    });
});
exports.createVendor = createVendor;
/**
 *
 * This helper functions return all vendors
 * @param selections Any selections
 * @returns
 */
const findAllVendors = (selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorList = yield model.find().select(selections).exec();
    return vendorList;
});
exports.findAllVendors = findAllVendors;
const findAllVendorMenus = (selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorList = yield model.find().select(selections).exec();
    const menuList = Promise.all(vendorList.map((currentVendor) => currentVendor.menu));
    return menuList;
});
/**
 *
 * This helper function returns vendor (as an array for some reason) with just the name
 *
 * @param nameOfBusiness The name of the business/vendor
 * @param selections Any selections
 * @returns
 */
const findVendorByName = (nameOfBusiness, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const businessData = yield model
        .find({ name: nameOfBusiness })
        .select(selections)
        .exec();
    return businessData;
});
exports.findVendorByName = findVendorByName;
// add comments
const findVendorByMenuItemId = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield itemHelpers.findItemById(itemId);
});
exports.findVendorByMenuItemId = findVendorByMenuItemId;
// add comments
const findVendorByUid = (uid, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield model.find({ uid: uid }).select(selections).exec();
    return vendor;
});
exports.findVendorByUid = findVendorByUid;
const findVendorById = (vendorId, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield model.findById(vendorId).select(selections).exec();
    return vendor;
});
exports.findVendorById = findVendorById;
/**
 *
 * @param id menu item id / vendor id / announcement id ...
 * @param property what property we want to add to
 * @param newData the data we want to replace with the property
 * @returns
 */
const updateProperty = (id, property, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield model.findByIdAndUpdate(id, { [property]: newData }, { new: true });
    return updated;
});
exports.updateProperty = updateProperty;
/**
 *
 * @param id Store ID
 * @param newMenu The menu item we want to add to the menu list
 * @returns the store object
 */
const updateMenu = (id, newMenu, test) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield findVendorById(id);
    // Combine both the prev menu with the new menu item
    if (!test) {
        const payload = [...vendor === null || vendor === void 0 ? void 0 : vendor.menu, ...newMenu];
        const updatedVendor = updateProperty(id, "menu", payload);
        return updatedVendor;
    }
    else {
        const testVendor = updateProperty(id, "menu", vendor === null || vendor === void 0 ? void 0 : vendor.menu);
        return testVendor;
    }
});
exports.updateMenu = updateMenu;
