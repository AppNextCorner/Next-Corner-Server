"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const cloudinary = require("cloudinary").v2;
exports.cloudinary = cloudinary;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_USER_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
