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
const sums_math_service_1 = __importDefault(require("../../../math/sums.math.service"));
const businessModel_1 = require("../../../models/businessModel");
const business_helper_1 = require("./business.helper");
class TrendingService {
    constructor() {
        this.businessModel = businessModel_1.vendorModel;
        this.sum = new sums_math_service_1.default();
    }
    updateVendorRating(idOfItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendor = yield (0, business_helper_1.findVendorByMenuItemId)(idOfItem);
            if (vendor) {
                const itemRatings = yield Promise.all(vendor.menu.map((item) => item.rating));
                console.log("itemRatings: ", itemRatings);
                const vendorRating = yield this.sum.average(itemRatings, itemRatings.length);
                console.log("venodor rating:", vendorRating);
                if (isNaN(vendorRating)) {
                    return yield this.businessModel.findByIdAndUpdate(vendor._id, {
                        rating: 0,
                    }, {
                        new: true,
                    });
                }
                return yield this.businessModel.findByIdAndUpdate(vendor._id, {
                    rating: vendorRating,
                }, { new: true });
            }
            console.log("Vendor doesn't exist!");
        });
    }
    setBestReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            let largest = 0;
            const allVendors = yield this.businessModel.find().exec();
            const allVendorRatings = yield Promise.all(allVendors.map((vendor) => vendor.rating));
            for (let i = 0; i < allVendorRatings.length - 1; i++) {
                let currentRating = allVendorRatings[i];
                if (currentRating > largest) {
                    largest = currentRating;
                }
            }
            const highestRatedVendor = allVendors[allVendorRatings.indexOf(largest)];
            return this.businessModel.findByIdAndUpdate(highestRatedVendor._id, { trending: "Best Reviews" }, { new: true });
        });
    }
}
exports.default = TrendingService;
