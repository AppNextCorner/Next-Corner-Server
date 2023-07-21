"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForRequiredFields = void 0;
const checkForRequiredFields = (requiredFields, checkIncoming) => {
    // Check if all fields are present in the incoming menu item
    // Check every field and check if there is a value present and not empty
    for (const field of requiredFields) {
        if (!checkIncoming[field] ||
            (typeof checkIncoming[field] === "object" &&
                Object.keys(checkIncoming[field]).length === 0) ||
            (typeof checkIncoming[field] === "string" &&
                checkIncoming[field].trim() === "")) {
            return `${field} is required`;
        }
    }
    return null;
};
exports.checkForRequiredFields = checkForRequiredFields;
