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
exports.imageHelper = void 0;
const cloudinary_1 = require("./cloudinary");
const remove_1 = require("./remove");
const imageHelper = (res, req, model, name) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log(JSON.stringify(req.body));
        console.log("image uploaded", req.file);
        // Replace the previous file with the new one uploaded from the user
        const result = yield cloudinary_1.cloudinary.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, {
            public_id: `${req.body._id}_${name}`,
            width: 500,
            height: 500,
            crop: "fill",
        });
        // Replace the existing file with the new file URL from Cloudinary
        const updatedImage = yield model.findByIdAndUpdate(req.body._id, { image: result.url }, { new: true });
        // Remove the file from storage to prevent overflow
        (0, remove_1.removeFile)((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
        res.status(201).json({
            success: true,
            message: name + " Card was updated",
        });
    }
    catch (error) {
        console.log("Error while uploading card image", error === null || error === void 0 ? void 0 : error.message);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later",
        });
    }
});
exports.imageHelper = imageHelper;
