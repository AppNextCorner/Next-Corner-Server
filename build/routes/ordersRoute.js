"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const orderRouter = express_1.default.Router();
// const decodeIDToken = require('../authenticateToken')
const orderModel_1 = __importDefault(require("../models/orderModel"));
const firebase_util_1 = require("../util/firebase.util");
const controller = __importStar(require("../controllers/orders.controller"));
function decodeIDToken(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Token Request", req.token);
        if (req.token) {
            try {
                const decodedToken = yield (0, firebase_util_1.verifyToken)(req.token);
                req["currentUser"] = decodedToken;
                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
orderRouter.post("/place-order", decodeIDToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        controller.postOrder(req, res, next);
    }
}));
orderRouter.put("/update-accept-status", decodeIDToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        controller.updateAcceptedStatus(req, res, next);
    }
}));
orderRouter.get("/get-orders-by-store-name/:name/", decodeIDToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        controller.getOrdersByStoreName(req, res, next);
    }
}));
orderRouter.get("/get-orders-by-uid/:uid/", decodeIDToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        controller.getOrdersByUid(req, res, next);
    }
}));
orderRouter.patch("/order-status/:id", (req, res) => {
    // grab the new score info
    const data = req.body;
    const auth = req.currentUser;
    // create a new score in the database
    function updateStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newStatus = yield orderModel_1.default.findOneAndUpdate({ _id: req.params.id }, {
                    orderStatus: data.status,
                });
                // grab _id from body -> then add what data to update
                return res.status(201).send(newStatus);
            }
            catch (err) {
                res.status(403).send(err.message);
            }
        });
    }
    updateStatus();
});
exports.default = orderRouter;
