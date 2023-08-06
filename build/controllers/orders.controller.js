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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcceptedStatus = exports.getOrdersByUid = exports.getOrdersById = exports.postOrder = void 0;
const helpers = __importStar(require("../helpers/modelHelpers/orders/orders.helper"));
const userHelper = __importStar(require("../helpers/modelHelpers/user.helper"));
const postOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        const placedOrder = yield helpers.createOrder(data);
        console.log(placedOrder);
        res.status(200).send({
            placedOrder,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.postOrder = postOrder;
// TODO:
// Get orders by name of the store and status of the order and get the uid here
const getOrdersById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Response is Iorder[]
    const response = yield helpers.findOrdersByProperty("orders.storeId", req.params.id);
    res.status(200).send({
        orders: response,
    });
});
exports.getOrdersById = getOrdersById;
// Ths is for the user's past order
const getOrdersByUid = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield helpers.findOrdersByProperty("uid", req.params.uid);
    const user = yield userHelper.findById(req.params.uid);
    res.status(200).send({
        userOrders: response,
        user,
    });
});
exports.getOrdersByUid = getOrdersByUid;
const updateAcceptedStatus = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data.newStatus === "accepted") {
            const updatedOrder = yield helpers.updateOrderProperty(data.orderId, "accepted", data.newStatus);
            res.status(200).send({
                updated: updatedOrder,
            });
        }
        else {
            yield helpers.deleteOrderById(data.orderId);
            res.status(200).send({
                payload: data.orderId,
                message: "Rejected Order",
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateAcceptedStatus = updateAcceptedStatus;
