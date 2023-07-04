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
exports.findVendorByMenuItemId = exports.findVendorByName = exports.findAllVendors = void 0;
const businessModel_1 = require("../../../models/businessModel");
const model = businessModel_1.vendorModel;
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
/**
 * This function finds a vendor with the id of the item the vender offers
 * @param id menuItemid
 * @param selections Any selections
 * @returns vendor as an array for some reason?
 */
const findVendorByMenuItemId = (id, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield model.find({ "menu._id": id }).select(selections).exec();
    return vendor;
});
exports.findVendorByMenuItemId = findVendorByMenuItemId;
