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
exports.deleteOrderById = exports.updateOrderProperty = exports.findOrdersByProperty = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../../../models/orderModel"));
const model = orderModel_1.default;
const deleteOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.findByIdAndDelete(orderId).exec();
});
exports.deleteOrderById = deleteOrderById;
// Add comments
const findOrdersByProperty = (property, select, selections = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model
        .find({ [property]: select })
        .select(selections)
        .exec();
});
exports.findOrdersByProperty = findOrdersByProperty;
// add comments
const updateOrderProperty = (orderId, property, newValue) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.findByIdAndUpdate(orderId, {
        [property]: newValue,
    }, {
        new: true,
    });
});
exports.updateOrderProperty = updateOrderProperty;
// add comments
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model.create({
        orders: order.orders,
        storeInfo: order.storeInfo,
        minutesToDone: order.minutesToDone,
        status: order.status,
        accepted: order.accepted,
        uid: order.uid,
    });
});
exports.createOrder = createOrder;
