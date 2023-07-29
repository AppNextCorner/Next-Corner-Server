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
const businessModel_1 = require("../../../models/businessModel");
/**
 * Vendor model
 */
const businessModel_2 = require("../../../models/businessModel");
/**
 * Other helper functions
 */
const storeHelpers = __importStar(require("./business.helper"));
class ItemService {
    constructor() {
        this.model = businessModel_1.itemModel;
        this.businessModel = businessModel_2.vendorModel;
    }
    /**
     * This method returns all items
     * @param selections Any selections
     * @returns
     */
    findAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get all items from the property menu as a Promise
            const data = yield this.businessModel.find().select("menu").exec();
            // An array of all items from every vendor
            const allItems = data.reduce(
            // Iterate through all items in all vendors
            (items, business) => {
                // For every vendor, concatenate its "menu" array to the "items" array.
                // The "concat" method combines the "menu" array of the current business with the "items" array.
                // This process is done for each business in the "data" array, effectively merging all the "menu" arrays together.
                return items.concat(business.menu);
            }, 
            // Initial state of the menu items
            []);
            return allItems;
        });
    }
    /**
     * This method returns a specific item with its id
     * @param itemId id of the item
     * @returns
     */
    findItemById(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const allItems = yield this.findAllItems();
            const filteredItems = allItems.filter((item) => item.id === itemId);
            return filteredItems;
        });
    }
    /**
     * add comments
     */
    findItemsByVendorId(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendor = yield storeHelpers.findVendorById(vendorId);
            if (vendor) {
                return vendor.menu;
            }
        });
    }
}
exports.default = ItemService;
