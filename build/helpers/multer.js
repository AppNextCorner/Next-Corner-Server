"use strict";
/**
 * Multer middleware configuration for handling file uploads.
 * @module upload
 */
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const fs = require("fs");
const { Request } = require("express");
/**
 * Disk storage configuration for multer.
 * Determines the destination directory and filename for uploaded files.
 * @type {multer.DiskStorage}
 */
const storage = multer.diskStorage({
    /**
     * Sets the destination path for uploaded files.
     * If the environment is not in production, the path is set to "../../src/images".
     * If the environment is in production, the path is set to "../../build/images".
     * If the destination directory does not exist, it is created.
     * @param {Request} _req - Express request object (unused).
     * @param {any} _file - Uploaded file (unused).
     * @param {function} cb - Callback function.
     */
    destination: function (_req, _file, cb) {
        let destinationPath = path.join(__dirname, "../../build/images");
        if (process.env.NODE_ENV !== "production") {
            destinationPath = path.join(__dirname, "../../src/images");
        }
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    /**
     * Sets the filename for uploaded files.
     * The filename is generated using UUIDv4 and the current timestamp, along with the original file extension.
     * @param {Request} _req - Express request object (unused).
     * @param {any} file - Uploaded file.
     * @param {function} cb - Callback function.
     */
    filename: function (_req, file, cb) {
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    },
});
/**
 * Filter function for accepting or rejecting files based on their mimetype.
 * Only files with the mimetype "image/jpeg", "image/jpg", or "image/png" are accepted.
 * @param {Request} req - Express request object.
 * @param {any} file - Uploaded file.
 * @param {function} cb - Callback function.
 */
const fileFilter = (_req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
/**
 * Multer middleware configuration for handling file uploads.
 * @type {multer.Multer}
 */
const upload = multer({
    storage,
    limits: {
        fileSize: 9000000, // 9MB file size limit
    },
    fileFilter,
});
module.exports = upload;
