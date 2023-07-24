"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = void 0;
const fs_1 = __importDefault(require("fs"));
const removeFile = function (filePath) {
    return new Promise((resolve, reject) => {
        // get the file path and remove it from the filesystem
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            console.log('File "' + filePath + '" removed!');
            resolve();
        });
    });
};
exports.removeFile = removeFile;
