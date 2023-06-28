"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Accessing the file system to delte the file that contains the duplicated user
const fs = require('fs');
const removeFile = function (filePath) {
    try {
        // get the file path and remove it from the filesystem
        fs.unlink(filePath, (err) => {
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
module.exports = removeFile;
