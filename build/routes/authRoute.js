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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const auth_controller_1 = require("../controllers/auth.controller");
authRouter.post("/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.signUp)(res, req, next);
}));
authRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.fetchUsers)(res, req);
}));
/**
 * This CRUD operation recieves user and desired role to update
 */
authRouter.put("/switchRoles", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.updateRole)(req, res, next);
}));
/**
 * This CRUD operation recieves an email and sends back a user
 */
authRouter.post("/getUser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_controller_1.getSingleUser)(req, res, next);
}));
exports.default = authRouter;
