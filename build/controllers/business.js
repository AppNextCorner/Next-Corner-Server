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
const { Request, Response } = require("express");
const { vendorModel, announcementModel } = require("../models/businessModel");
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
module.exports = {
    createCard,
};
