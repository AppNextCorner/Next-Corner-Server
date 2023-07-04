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
const orderRouter = express_1.default.Router();
// const decodeIDToken = require('../authenticateToken')
const orderModel_1 = __importDefault(require("../models/orderModel"));
const firebase_util_1 = require("../util/firebase.util");
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
orderRouter.post("/", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    // console.log("current user: ", req.currentUser);
    if (auth) {
        try {
            const order = new orderModel_1.default(req.body);
            const saveOrder = yield order.save();
            // console.log(saveOrder);
            return res.status(201).json(saveOrder);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
orderRouter.get("/", decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    //console.log("Auth: ", req)
    if (auth) {
        const orders = yield orderModel_1.default.find({});
        // console.log(orders);
        return res.json(orders.map((order) => order.toJSON()));
    }
    else {
        return res.status(403).send("Not authorized");
    }
}));
orderRouter.patch("/order-status/:id", (req, res) => {
    // grab the new score info
    const data = req.body;
    const auth = req.currentUser;
    //const id = parseInt(req.query.id)
    //const mapScore = Cart.map(val => val.cartData)
    // create a new score in the database
    function updateStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(req.currentUser);
                // console.log(req.params.id);
                // console.log(req.body);
                const newStatus = yield orderModel_1.default.findOneAndUpdate({ _id: req.params.id }, {
                    orderStatus: data.status,
                });
                // console.log(newStatus);
                // grab _id from body -> then add what data to update
                return res.status(201).send(newStatus);
            }
            catch (err) {
                res.status(403).send(err.message);
            }
        });
    }
    // if (auth) {
    updateStatus();
    // } else {
    //   return res.status(403).send('Not authorized')
    // }
});
exports.default = orderRouter;
