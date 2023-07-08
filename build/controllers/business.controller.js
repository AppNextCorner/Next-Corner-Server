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
exports.uploadStore = exports.getVendorByName = exports.createCard = void 0;
const business_helper_1 = require("../helpers/modelHelpers/businessModelHelpers/business.helper");
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
const uploadStore = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request_data = JSON.parse(req.body.payload);
        console.log('parsed: ', request_data);
        // Replace the previous file with the new one uploaded from the user
        // const result = await cloudinary.uploader.upload(req.file.path, {
        //   public_id: `${req.file.path}_banner`,
        //   width: 500,
        //   height: 500,
        //   crop: "fill",
        // });
        console.log(req.file);
        //removeFile(req.file.path); // Remove the file from storage to prevent overflow
        // res.status(201).send({})
    }
    catch (err) {
        next(err);
    }
});
exports.uploadStore = uploadStore;
