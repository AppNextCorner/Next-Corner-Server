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
require('dotenv').config();
const express = require('express');
const orderRouter = express.Router();
const { Request, Response, Next } = require("express");
// const decodeIDToken = require('../authenticateToken')
const Orders = require('../models/orderModel');
const firebase = require('../util/firebase.util');
function decodeIDToken(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Token Request', req.token);
        if (req.token) {
            try {
                const decodedToken = yield firebase.verifyToken(req.token);
                req['currentUser'] = decodedToken;
                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
orderRouter.post('/', decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    console.log("current user: ", req.currentUser);
    if (auth) {
        try {
            const order = new Orders(req.body);
            const saveOrder = yield order.save();
            console.log(saveOrder);
            return res.status(201).json(saveOrder);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(403).send('Not authorized');
    }
}));
orderRouter.get('/', decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    //console.log("Auth: ", req)
    if (auth) {
        const orders = yield Orders.find({});
        console.log(orders);
        return res.json(orders.map((order) => order.toJSON()));
    }
    else {
        return res.status(403).send('Not authorized');
    }
}));
orderRouter.patch('/order-status/:id', (req, res) => {
    // grab the new score info
    const data = req.body;
    const auth = req.currentUser;
    //const id = parseInt(req.query.id)
    //const mapScore = Cart.map(val => val.cartData)
    // create a new score in the database
    function updateStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.currentUser);
                console.log(req.params.id);
                console.log(req.body);
                const newStatus = yield Orders.findOneAndUpdate({ _id: req.params.id }, {
                    orderStatus: data.status,
                });
                console.log(newStatus);
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
module.exports = orderRouter;
