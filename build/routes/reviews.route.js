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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_controller_1 = __importDefault(require("../controllers/reviews.controller"));
const reviewsRouter = (0, express_1.Router)();
const controller = new reviews_controller_1.default();
reviewsRouter.post("/create", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    controller.createReview(req, res, next);
}));
reviewsRouter.get("/getReviews/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    controller.getReviews(req, res, next);
}));
exports.default = reviewsRouter;
