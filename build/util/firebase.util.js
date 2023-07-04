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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createUser = void 0;
require("dotenv").config;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const config = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: (_b = (_a = process.env.FIREBASE_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, "\n")) !== null && _b !== void 0 ? _b : "",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
const app = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config),
});
const createUser = (email, password, uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield app.auth().createUser({
        email,
        password,
        uid,
    });
});
exports.createUser = createUser;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield app.auth().verifyIdToken(token);
});
exports.verifyToken = verifyToken;
