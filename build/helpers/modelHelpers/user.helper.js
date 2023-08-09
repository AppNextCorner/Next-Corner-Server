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
exports.updateRoleByUserId = exports.findByEmail = exports.findById = void 0;
const userModel_1 = require("../../models/userModel");
const model = userModel_1.userModel;
const findById = (id, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.findById(id).select(selections).exec();
});
exports.findById = findById;
const findByEmail = (email, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('returning: ', yield model.findOne({ email: email }).select(selections).exec());
    return yield model.findOne({ email: email }).select(selections).exec();
});
exports.findByEmail = findByEmail;
const updateRoleByUserId = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.findByIdAndUpdate(userId, { role: role }, { new: true });
});
exports.updateRoleByUserId = updateRoleByUserId;
