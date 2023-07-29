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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenuItem = exports.updateMenu = exports.uploadMenu = exports.updateProperty = exports.findVendorByMenuItemId = exports.findVendorById = exports.findVendorByUid = exports.findVendorByName = exports.findAllVendors = exports.createVendor = void 0;
const businessModel_1 = require("../../../models/businessModel");
const item_service_1 = __importDefault(require("./item.service"));
const model = businessModel_1.vendorModel;
const itemHelpers = new item_service_1.default();
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
const findVendorById = (vendorId, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield model.findById(vendorId).select(selections).exec();
    return vendor;
});
exports.findVendorById = findVendorById;
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
    const vendor = yield findVendorById(item[0].storeInfo.storeId);
    return vendor;
});
exports.findVendorByMenuItemId = findVendorByMenuItemId;
// add comments
const findVendorByUid = (uid, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield model.find({ uid: uid }).select(selections).exec();
    return vendor;
});
exports.findVendorByUid = findVendorByUid;
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
 *  Adds a new menu item to the menu list
 * @param id Store ID
 * @param newMenu The menu item we want to add to the menu list
 * @returns the store object

 */
const uploadMenu = (storeId, newMenu, test) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield findVendorById(storeId);
    // Combine both the prev menu with the new menu item
    if (!test) {
        const payload = [...vendor === null || vendor === void 0 ? void 0 : vendor.menu, ...newMenu];
        const updatedVendor = updateProperty(storeId, "menu", payload);
        return updatedVendor;
    }
    else {
        const testVendor = updateProperty(storeId, "menu", vendor === null || vendor === void 0 ? void 0 : vendor.menu);
        return testVendor;
    }
});
exports.uploadMenu = uploadMenu;
/**
 *
 */
const updateMenu = (storeId, newMenu) => __awaiter(void 0, void 0, void 0, function* () {
    if (newMenu.length > 1) {
        console.log("Updating more than one item");
        return null;
    }
    // get the vendor
    const vendor = yield findVendorById(storeId);
    if (vendor) {
        // get previous items excluding the one we're trying to upload
        // this is so that we don't get duplicates -> Could be used for updating by removing previous old item
        const previousItems = vendor === null || vendor === void 0 ? void 0 : vendor.menu.filter((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) !== newMenu[0]._id; });
        // concat previous items(without old menu) and new menu item
        const payload = [...previousItems, ...newMenu];
        const updatedVendor = updateProperty(storeId, "menu", payload);
        return updatedVendor;
    }
    console.log("vendor not found");
    return null;
});
exports.updateMenu = updateMenu;
/**
 * @param itemId
 * @param updatedItem - Item Object to replace the old item with
 */
const updateMenuItem = (updatedItem) => __awaiter(void 0, void 0, void 0, function* () {
    const storeId = updatedItem[0].storeInfo.storeId;
    // Update the menu with updated data
    const uploadedMenu = yield updateMenu(storeId, updatedItem);
    return uploadedMenu;
});
exports.updateMenuItem = updateMenuItem;
