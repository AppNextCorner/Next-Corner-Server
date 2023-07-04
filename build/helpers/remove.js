"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = void 0;
// Accessing the file system to delte the file that contains the duplicated user
const fs_1 = __importDefault(require("fs"));
const removeFile = function (filePath) {
    try {
        // get the file path and remove it from the filesystem
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        console.log('File"' + filePath + '" removed!');
    }
    catch (err) {
        throw err;
    }
};
exports.removeFile = removeFile;
